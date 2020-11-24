import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

import { favoritesVar } from '../utils/cache';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { FaHeart, FaRegHeart, FaHeartBroken } from 'react-icons/fa';

export const FAVORITES = gql`
	query Favorites {
		favorite {
            id
            name
        }
	}
`;

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

    const [favor, { loading, error, data }] = useMutation(ADD_FAVORITE, { 
        variables: { name: props.subreddit.name },
        onCompleted(data) {
            console.log("favor onCompleted", data.addFavorite)
            // if(data.addFavorite.success && data.addFavorite.favorite)
            //     favoritesVar([data.addFavorite.favorite.name])
        },
        update(cache, { data: { addFavorite } }){
            console.log("favor update", addFavorite.favorite)
            cache.modify({
                id: cache.identify({
                    __typename: "User",
                    id: localStorage.getItem('userId'),
                }),
                fields: {
                    favorites(allFavorites) {
                        const favoriteRef = cache.writeFragment({
                            data: addFavorite.favorite,
                            fragment: gql`
                                fragment RemoveFavorite on Favorite {
                                    name
                                }
                            `
                        })
                        let newTab = allFavorites.slice().push(favoriteRef)//.filter(favRef => favRef.__ref !== favoriteRef.__ref)
                        console.log(allFavorites, favoriteRef, newTab)
                        return newTab
                    }
                }
            })
        }
    })

    function handleHeart(event) {
        event.preventDefault();
        console.log("SubredditItem handleHeart", props.subreddit.name)
        favor()
    }

    let [hover, setHover] = useState(false)

    var linkStyle;
    if (hover) {
        linkStyle = {color: '#bd2130', fontSize: "26px", cursor: "pointer"}
    } else {
        linkStyle = {color: '#dc3545', fontSize: "24px", margin: "1px"}
    }

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
                            <FaRegHeart className style={linkStyle} onClick={handleHeart} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}/>
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