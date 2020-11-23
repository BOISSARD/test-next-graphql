import Link from 'next/link'
import { useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FaTrash, FaHeartBroken } from 'react-icons/fa';

export default function FavouriteItem (props) {

    function handleTrash(event) {
        event.preventDefault();
        console.log("FavouriteItem handleTrash", props.favourite.name)
    }

    let [hover, setHover] = useState(false)

    var linkStyle;
    if (hover) {
        linkStyle = {color: '#bd2130', fontSize: "26px", cursor: "pointer"}
    } else {
        linkStyle = {color: '#dc3545', fontSize: "24px", margin: "1px"}
    }

    return (
        <Link href={`/reddit/r/${props.favourite.name}`} key={props.favourite.name}>
            <ListGroup.Item action variant={props.active ? "secondary" : "light"} >
                <Row className="align-items-center">
                    <Col>r/{props.favourite.name}</Col>                
                    <Col xs={"auto"}>
                        <FaHeartBroken style={linkStyle} onClick={handleTrash} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}/>
                    </Col>
                </Row>
            </ListGroup.Item>
        </Link>
    )

} 