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
import { FaSearch } from 'react-icons/fa';

var state = { subreddit: null }

export default function MyApp({ Component, pageProps }) {

    const router = useRouter()
    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        console.log("handleSubmit", event, state);
        event.preventDefault();
        router.push(`/reddit/search/${!!state.subreddit ? state.subreddit : ""}`)
    }

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Next Skill Test</title>
                <link rel="icon" href="/logo.jpg" />
            </Head>

            <Navbar bg="primary">
                <Navbar.Brand className="ml-2"><Link href="/"><a className="h4 text-white">Home</a></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-4">
                    <Nav.Link ><Link href="/reddit"><span className="btn-link text-white">Reddit</span></Link></Nav.Link>
                </Nav>
                {/* <form className="mr-auto" onSubmit={this.handleSubmit}> */}
                <form className="mr-auto" onSubmit={handleSubmit}>
                    <InputGroup>
                        {/* <Form.Control placeholder="Search Subreddit" type="text" onChange={event => this.state.subreddit = event.target.value}/> */}
                        <Form.Control placeholder="Search Subreddit" type="text" onChange={event => state.subreddit = event.target.value} />
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                    <Button variant="success" onClick={handleClose}>Login</Button>
                </Modal.Footer>
            </Modal>

            {/* <this.component {...this.pageProps} /> */}
            <Component {...pageProps} />

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
        `}</style>
        </ApolloProvider>
    )
}
