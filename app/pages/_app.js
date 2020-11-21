import Head from 'next/head'
import Link from 'next/link'
// import Router from 'next/router'
import { useRouter } from 'next/router'

// import { useHistory, withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { FaSearch } from 'react-icons/fa';

var state = { subreddit: null }

// class MyApp extends React.Component {
// export default class MyApp extends React.Component {
export default function MyApp({Component, pageProps}) {

    /*constructor(props) {
        super(props);
        console.log("MyApp", props)
        this.component = props.Component
        this.pageProps = props.pageProps
        this.state = { subreddit: null }
        this.handleSubmit = this.handleSubmit.bind(this);
    }*/
    const router = useRouter()

    function handleSubmit(event) {
        console.log("handleSubmit", event, state);
        event.preventDefault();
        //let history = useHistory();
        //Router.push('/reddit/search')
        // router.push('/reddit/search')
        router.push(`/reddit/search/${!!state.subreddit? state.subreddit : ""}`)
    }

    //render() {
        return (
            <>
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
                                <Form.Control placeholder="Search Subreddit" type="text" onChange={event => state.subreddit = event.target.value}/>
                                <InputGroup.Append>
                                    <Button variant="outline-light" type="submit"><FaSearch /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                    </form>
                    <Link href="/login"><Button variant="outline-light" className="mr-2 px-4">Login</Button></Link>
                </Navbar>

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
            </>
        )
    //}
}

// export default withRouter(MyApp);