import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client';

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
            email
            token
        }
    }
`;

let firstConnexion = true

export default function LoginModal(props) {

    const [login, { loading, error, data }] = useMutation(USER_LOGIN);
    const [email, setEmail] = useState(null);
    // let email = null
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)//show = false //setShow(false);
    const handleShow = () => setShow(true)//show = true //setShow(true);

    useEffect(() => setShow(props.show), [props.show]);
    useEffect(() => props.showChanged(show), [show]);

    function handleLogin(event) {
        event.preventDefault();
        if (!email) return
        console.log("handleLogin", email)
        login({variables: { email: email} })
        console.log("after login", loading, error, data)
        //handleClose()
    }

    //console.log("display data", data, !!data)
    if(!!data && firstConnexion) {
        console.log("login data", data)
        handleClose()
        firstConnexion = false
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {`${loading}${!!error}${!!data}`}
                <Alert key={`${loading}${!!error}${!!data}`} variant={loading ? "info": "success"}>
                        Loading...
                </Alert> */}
                <Form inline onSubmit={handleLogin}>
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Label htmlFor="emailInput">Email :</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="emailInput"
                                placeholder="Email address"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                <Button variant="success" onClick={handleLogin}>Login</Button>
            </Modal.Footer>
        </Modal>
    )
}