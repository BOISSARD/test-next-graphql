import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min.js'
import Head from 'next/head'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/logo.jpg" />
            </Head>

            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/reddit">Reddit</Nav.Link>
                        <Nav.Link href="/reddit/search">Search</Nav.Link>
                    </Nav>
                    <Nav.Link href="/connexion"><Button variant="outline-light">Connection</Button></Nav.Link>
                </Navbar.Collapse>
            </Navbar>

            <Component {...pageProps}/>
            
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
}