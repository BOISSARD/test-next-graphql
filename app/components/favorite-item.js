import Link from 'next/link'
import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FaTrash, FaHeartBroken } from 'react-icons/fa';

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

export default function FavoriteItem (props) {

    const [disfavor, __] = useMutation(REMOVE_FAVORITE, { 
        variables: { name: props.favorite.name },
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
        }
    })

    function handleTrash(event) {
        event.preventDefault();
        console.log("FavoriteItem handleTrash", props.favorite)
        disfavor()
    }

    let [hover, setHover] = useState(false)

    var linkStyle;
    if (hover) {
        linkStyle = {color: '#bd2130', fontSize: "26px", cursor: "pointer"}
    } else {
        linkStyle = {color: '#dc3545', fontSize: "24px", margin: "1px"}
    }

    return (
        <Link href={`/reddit/r/${props.favorite.name}`} key={props.favorite.name}>
            <ListGroup.Item action variant={props.active ? "secondary" : "light"} >
                <Row className="align-items-center">
                    <Col>r/{props.favorite.name}</Col>                
                    <Col xs={"auto"}>
                        <FaHeartBroken style={linkStyle} onClick={handleTrash} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}/>
                    </Col>
                </Row>
            </ListGroup.Item>
        </Link>
    )

} 