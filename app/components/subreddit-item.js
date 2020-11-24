import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

import { favoritesVar } from '../utils/cache';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
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

export default function SubredditItem (props) {

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
                        console.log("favor end", allFavorites, favoriteRef, allFavorites.slice().push(favoriteRef))
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
                        return allFavorites.filter(favRef => favRef.__ref !== favoriteRef.__ref)
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
    let [isFavorised, setIsFavorised] = useState(null)//useState(data && data.favorites && data.favorites.findIndex(fav => fav.name === props.subreddit.name) >= 0)
    useEffect(() => {
        if(data && data.favorites)
            setIsFavorised(data.favorites.findIndex(fav => fav.name === props.subreddit.name) >= 0)
        else setIsFavorised(false)
    });

    var linkStyle;
    if (hover) {
        linkStyle = {color: '#bd2130', fontSize: "26px", cursor: "pointer"}
    } else {
        linkStyle = {color: '#dc3545', fontSize: "24px", margin: "1px"}
    }

    //console.log("SubredditItem", props.subreddit.name, isFavorised, data)

    return (
        <div>
            <Card className="bg-dark text-white mb-4" >
                {/* style={{backgroundColor: props.subreddit.color}} */}
                {!!props.subreddit.header &&
                    <div className="header-img-cover">
                        <img src={props.subreddit.header} className="header-img" />
                    </div>
                }
                <Card.Header>
                    <Row className="align-items-center" noGutters>
                        <Col xs>
                            {!!props.subreddit.header &&
                                <img src={props.subreddit.icon} className="header-icon-img mr-4" />
                            }
                            <h4 className="header-title">{props.subreddit.name}</h4>
                        </Col>             
                        <Col xs={"auto"} className="pr-4">
                        {isFavorised ? 
                            <FaHeartBroken className style={linkStyle} onClick={handleHeart} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}/>
                            :
                            <FaHeart className style={linkStyle} onClick={handleHeart} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}/>
                        }
                        </Col>
                        <Col xs={"auto"}>
                            <Link href={`/reddit/r/${props.subreddit.name}`}><Button href={`/reddit/r/${props.subreddit.name}`} variant="outline-light" className="px-5">Link</Button></Link>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{props.subreddit.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col sm={6}>
                            {/* <Card.Text>Since the {moment(props.subreddit.date * 1000).format("DD MMMM YYYY")}</Card.Text> */}
                        </Col>
                        <Col sm={6}>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <style jsx>{`
                .header-img-cover {
                    background-image: url('${props.subreddit.header}');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .header-img {
                    width: 100%;
                    max-height: 150px;
                    visibility: hidden;
                }
                .header-icon-img {
                    max-height: 80px;
                    border-radius: 100%;
                }
                .header-title {
                    display: inline-block;
                }
            `}</style>
        </div>
    )

}