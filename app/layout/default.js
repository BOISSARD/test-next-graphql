import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useApolloClient, useQuery } from '@apollo/client';

import LoginModal from '../components/login-modal'
import { isLoggedInVar, favoritesVar } from '../utils/cache';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa';

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

const ME = gql`
    query me {
        me {
            id
            email
            token
            favorites {
                id
                name
            }
        }
    }
`;

export default function Defaultlayout(props) {

    const router = useRouter()
    const client = useApolloClient();

    const { data } = useQuery(IS_LOGGED_IN);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true)
    const [subreddit, setSubreddit] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        var formVal = router.query
        delete formVal.sub
        //console.log("handleSubmit", event, subreddit, router);
        if (router.pathname !== "/reddit/search/[sub]" || !subreddit)
            router.push(`/reddit/search/${!!subreddit ? subreddit : ""}`)
        else
            router.push({
                pathname: `/reddit/search/${subreddit}`,
                search: "?" + new URLSearchParams(Object.assign({}, formVal)).toString()
            })
    }

    function handleLogout() {
        client.cache.evict({ fieldName: "me" })
        client.cache.gc()
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        isLoggedInVar(false)
        favoritesVar([])
    }

    if(data.isLoggedIn){
        console.log("Defaultlayout data", data)
    }

    let meData = useQuery(ME).data
    if(meData && meData.me && meData.me.favorites && meData.me.favorites.length) {
        favoritesVar(meData.me.favorites)
    }

    return (
        <div>
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
                {!data.isLoggedIn ?
                    <Button variant="outline-light" className="mr-2 px-4" onClick={handleShow}>Login</Button>
                    :
                    <Button variant="outline-light" className="mr-2 px-4" onClick={handleLogout}>Logout</Button>
                }
            </Navbar>

            <LoginModal show={show} showChanged={event => setShow(event)} />

            <div className="custom-container">
                {/* <this.component {...this.pageProps} /> */}
                {props.children}
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
        </div>
    )

}