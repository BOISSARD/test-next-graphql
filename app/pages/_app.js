import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.css';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaSearch } from 'react-icons/fa';

var state = { subreddit: null }

export default function MyApp({ Component, pageProps }) {

    const router = useRouter()
    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });

    const [show, setShow] = useState(false);
    const [subreddit, setSubreddit] = useState(null);
    const [email, setEmail] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        //console.log("handleSubmit", event, state);
        event.preventDefault();
        var formVal = router.query
        delete formVal.sub
        console.log("handleSubmit", event, state, router);
        if(router.pathname !== "/reddit/search/[sub]" || !subreddit)
            router.push(`/reddit/search/${!!subreddit ? subreddit : ""}`)
        else
            router.push({
                pathname: `/reddit/search/${subreddit}`,
                search: "?" + new URLSearchParams(Object.assign({}, formVal)).toString()
            })
    }

    function handleLogin(event) {
        event.preventDefault();
        console.log("handleLogin", event.target.value)
    }

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Next Skill Test</title>
                <link rel="icon" href="/logo.jpg" />
            </Head>

            <Navbar bg="primary" fixed="top">
                <Navbar.Brand className="ml-2"><Link href="/"><a className="h4 text-white">Home</a></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-4">
                    <Nav.Link ><Link href="/reddit"><span className="btn-link text-white">Reddit</span></Link></Nav.Link>
                </Nav>
                <form className="mr-auto" onSubmit={handleSubmit}>
                    <InputGroup>
                        {/* <Form.Control placeholder="Search Subreddit" type="text" onChange={event => this.subreddit = event.target.value}/> */}
                        <Form.Control placeholder="Search Subreddit" type="text" onChange={event => setSubreddit(event.target.value)} />
                        <InputGroup.Append>
                            <Button variant="outline-light" type="submit"><FaSearch /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
                <Button variant="outline-light" className="mr-2 px-4" onClick={handleShow}>Login</Button>
            </Navbar>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            onChange={event => state.email = event.target.value}
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

            <div className="custom-container">
                {/* <this.component {...this.pageProps} /> */}
                <Component {...pageProps} />
            </div>

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }

                * {
                box-sizing: border-box;
                }

                .custom-container {
                    display: block;
                    position absolute;
                    top: 57px;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
            

        </ApolloProvider>
    )
}
