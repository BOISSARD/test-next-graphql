import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client';

import { isLoggedInVar, favouritesVar } from '../utils/cache';

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export const USER_LOGIN = gql`
    mutation Login($email: String!) {
        login(email: $email) {
            id
            token
            email
            favourites {
                name
            }
        }
    }
`;

export const SET_FAVOURITES = gql`
	query SetFavorites {
		favourites @client
    }
`

//let firstTry = true

export default function LoginModal(props) {

    const [login, { loading, error, data }] = useMutation(USER_LOGIN, { 
        onCompleted({login}) {
            console.log("onCompleted", login)
            localStorage.setItem('token', login.token);
            localStorage.setItem('userId', login.id);
            isLoggedInVar(true)
            handleClose()
        },
        update(cache, { data }) {
            console.log("update", cache, data.login)
            if(data.login && data.login.id) {
                favouritesVar(data.login.favourites)
            }
        }
    });
    const [email, setEmail] = useState(null);
    // let email = null
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)//show = false //setShow(false);
    const handleShow = () => setShow(true)//show = true //setShow(true);

    const [alerts, setAlerts] = useState([])

    useEffect(() => setShow(props.show), [props.show]);
    useEffect(() => props.showChanged(show), [show]);

    function handleLogin(event) {
        event.preventDefault();
        //firstTry = false
        if (!email) return
        login({variables: { email: email} })
        //handleClose()
    }

    // console.log("display data", "\n", loading, error, data, "\n", loading, !!error, !!data)
    /*if(!!data && !!data.login) {
        setTimeout(() => {
            handleClose()
        }, 1000)
    }*/

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {`${loading}${!!error}${!!data}`}   key={`${loading}${!!error}${!!data}${firstTry}`}*/}
                {/* loading &&
                <Alert key={`loading-${loading}-${firstTry}`} variant="info">
                    Loading...
                </Alert> 
                }
                { (!!error || !(data && !!data.login)) && firstTry &&
                <Alert key={`error-${!!error}-${!!data && !!data.login}-${firstTry}`} variant="danger">
                    Email incorrect
                </Alert> 
                }
                { data && !!data.login &&
                <Alert key={`success-${!!data.login}`} variant="success">
                    Success connexion {`${data}`}
                </Alert> 
                */}
                {/* <Alert key={`${loading}${!!error}${!!data}${firstTry}`} variant="info">
                    {`${loading}${!!error}${!!data}${firstTry}`}
                    {loading ? "Loading..." : "Email incorrect"}
                </Alert> */}
                <Form onSubmit={handleLogin}>
                    <Row className="align-items-center">
                        <Col xs={{span: 3, offset: 1}}>
                            <Form.Label htmlFor="emailInput">Email :</Form.Label>
                        </Col>
                        <Col xs={7}>
                            <Form.Control
                                id="emailInput"
                                placeholder="Email address"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Row className="align-items-center">
                    <Col></Col>
                    <Col xs={"auto"}>
                        <Button block variant="danger" onClick={handleClose}>Cancel</Button>
                    </Col>
                    <Col xs={"auto"}>
                        <Button block variant="success" onClick={handleLogin}>Login</Button>
                    </Col>
                    <Col ></Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}