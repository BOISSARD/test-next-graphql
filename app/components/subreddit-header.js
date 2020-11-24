import { useRouter } from 'next/router'
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import moment from 'moment'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import CardColumns from 'react-bootstrap/CardColumns'
import { FaHeart, FaRegHeart, FaHeartBroken } from 'react-icons/fa';

export const GET_FAVORITES = gql`
	query GetFavorites {
		favorites @client
	}
`;

export const ADD_FAVORITE = gql`
    mutation addFavorite($name: String!) {
        addFavorite(name: $name) {
            success
            message
            favorite {
                id
                name
            } 
        }
    }
`;

export const REMOVE_FAVORITE = gql`
    mutation removeFavorite($name: String!) {
        removeFavorite(name: $name) {
            success
            message
            favorite {
                id
                name
            } 
        }
    }
`;

export default function SubredditHeader(props) {
    
    const { data } = useQuery(GET_FAVORITES);

    const [favor, _] = useMutation(ADD_FAVORITE, { 
        variables: { name: props.subreddit.name },
        update(cache, { data/*: { addFavorite }*/ }){
            console.log("favor update", data)//addFavorite.favorite)
            cache.modify({
                id: cache.identify({
                    __typename: "User",
                    id: localStorage.getItem('userId'),
                }),
                fields: {
                    favorites(allFavorites) {
                        console.log("favor allFavorites", allFavorites)
                        const favoriteRef = cache.writeFragment({
                            data: data.addFavorite ? data.addFavorite.favorite : null,
                            fragment: gql`
                                fragment Favorite on Favorite {
                                    name
                                }
                            `
                        })
                        //console.log("favor end", allFavorites, favoriteRef, allFavorites.slice().push(favoriteRef))
                        return allFavorites.slice().push(favoriteRef)
                    }
                }
            })
        },
        onCompleted(){
            setIsFavorised(!isFavorised)
        }
    })
    const [disfavor, __] = useMutation(REMOVE_FAVORITE, { 
        variables: { name: props.subreddit.name },
        update(cache, { data/*: { removeFavorite }*/ }){
            //console.log("disfavor update", data)//, addFavorite.favorite)
            cache.modify({
                id: cache.identify({
                    __typename: "User",
                    id: localStorage.getItem('userId'),
                }),
                fields: {
                    favorites(allFavorites) {
                        //console.log("disfavor allFavorites", allFavorites, data.removeFavorite)
                        const favoriteRef = cache.writeFragment({
                            data: data.removeFavorite ? data.removeFavorite.favorite : null,
                            fragment: gql`
                                fragment Favorite on Favorite {
                                    name
                                }
                            `
                        })
                        //console.log("disfavor end", allFavorites, favoriteRef, allFavorites.filter(favRef => favRef.__ref !== favoriteRef.__ref))
                        let favs = allFavorites && allFavorites.filter(favRef => favRef.__ref !== favoriteRef.__ref)
                        //console.log(favs)
                        return !!favs && favs.length > 0 ? favs : []
                    }
                }
            })
        },
        onCompleted(){
            setIsFavorised(!isFavorised)
        }
    })

    function handleHeart(event) {
        event.preventDefault();
        isFavorised ? disfavor() : favor()
    }

    let [hover, setHover] = useState(false)
    let [isFavorised, setIsFavorised] = useState(false)//useState(props.data && props.data.favorites && props.data.favorites.findIndex(fav => fav.name === props.subreddit.name) >= 0)
    useEffect(() => {
        if(data && data.favorites)
            setIsFavorised(data.favorites.findIndex(fav => fav.name === props.subreddit.name) >= 0)
        else setIsFavorised(false)
    });

    function toggleHover() {
        console.log("hover avant", hover)
        setHover(!hover)
        console.log("hover après", hover)
    }

    var linkStyle;
    if (hover) {
        linkStyle = { color: '#bd2130', fontSize: "26px", cursor: "pointer" }
    } else {
        linkStyle = { color: '#dc3545', fontSize: "24px", margin: "1px" }
    }

    return (
        <div>
            {!!props.subreddit.header &&
                <Card bg="light" border="light" style={{ zIndex: "10", marginBottom: "-5px" }}>
                    <Card.Img variant="top" src={props.subreddit.header} />
                    <Card.ImgOverlay className="text-white h3 d-flex align-items-end justify-content-center">
                        <Card.Text>{props.subreddit.header_text}</Card.Text>
                    </Card.ImgOverlay>
                </Card>
            }
            <Card bg="light" style={{ zIndex: "1" }}>
                <Card.Header>
                    <Row className="align-items-center" noGutters>
                        {!!props.subreddit.header &&
                            <Col xs={"auto"}>
                                <img src={props.subreddit.icon} className="header-icon-img mr-4" />
                            </Col>
                        }
                        <Col xs>
                            <h4 className="header-title">{props.subreddit.name}</h4>
                            <blockquote className="blockquote">
                                <p className="mb-0">{props.subreddit.title}</p>
                            </blockquote>
                        </Col>
                        <Col xs={"auto"}>
                            {isFavorised ?
                                <FaHeartBroken className style={linkStyle} onClick={handleHeart} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)} />
                                :
                                <FaHeart className style={linkStyle} onClick={handleHeart} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)} />
                            }
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{props.subreddit.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Row className="align-items-center">
                        <Col>Since {moment(props.subreddit.date * 1000).format('DD MMM YYYY')}</Col>
                        <Col></Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}