import { useRouter } from 'next/router'

import RedditLayout from '../../../layout/reddit'
import Master from "../../../components/master";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

export default function Subreddit(props) {
   
    const router = useRouter()
    let sub = props.sub

    return (
        <RedditLayout key={sub}>
            <h1 className="title">/reddit/r/{sub}</h1>
        </RedditLayout>
    )
}

export async function getStaticProps({ params }) {
    /*const res = await fetch(`https://www.reddit.com/top.json`)
    const data = await res.json()
    console.log("getStaticProps", params, data)*/
    return {
        props: params,
        //revalidate: 1,
        //key: params.sub
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { sub: '*' } }
        ],
        fallback: true
    };
}