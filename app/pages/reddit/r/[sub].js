import { useRouter } from 'next/router'
import React, { useLayoutEffect, useState, useEffect } from 'react';

import { gql, useQuery, NetworkStatus } from '@apollo/client';

import RedditLayout from '../../../layout/reddit'
import PublicationItem from '../../../components/publication-item';
import SubredditHeader from '../../../components/subreddit-header'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import CardColumns from 'react-bootstrap/CardColumns'
import { FaHeart, FaRegHeart, FaHeartBroken } from 'react-icons/fa';

const GET_SUBREDDIT = gql`
    query subreddit($name: String!, $limit: Int, $sort: String, $time: String, $after: String) {
        subreddit(name: $name, limit: $limit, sort: $sort, time: $time, after: $after) {
            id
            name
            date
            title
            description
            header
            header_text
            icon
            color
            type
            category
            over18
            subscribers
            publications {
                id
                name
                date
                title
                author
                subreddit 
                ups
                ups_ratio
                media {
                    url    
                    url_type
                    thumbnail
                    video
                }
                text
                comments {
                    id
                    message
                    author
                    date
                    ups
                    replies {
                        id
                        message
                        author
                        date
                        ups
                    }
                }
            }
        }
    }
`;

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
}

export default function Subreddit(props) {
    const router = useRouter()
    var formVal = router.query
    delete formVal.sub

    const [width, height] = useWindowSize();
    let nbColumns = width < 540 ? 1 : width < 1140 ? 2 : 3
    console.log(width, height, nbColumns, [...Array(nbColumns).keys()])

    function handleLimitChange(event) {
        formVal.limit = event.target.value
        //console.log("Subreddit handleLimitChange", event.target.value, formVal, router.pathname)
        router.push({
            pathname: router.pathname.replace("[sub]", props.sub),
            search: "?" + new URLSearchParams(formVal).toString()
        })
    }
    function handleSortChange(event) {
        formVal.sort = event.target.value
        //console.log("Subreddit handleSortChange", event.target.value, formVal, router.pathname)
        router.push({
            pathname: router.pathname.replace("[sub]", props.sub),
            search: "?" + new URLSearchParams(formVal).toString()
        })
    }
    function handleTimeChange(event) {
        formVal.time = event.target.value
        //console.log("Subreddit handleTimeChange", event.target.value, formVal, router.pathname)
        router.push({
            pathname: router.pathname.replace("[sub]", props.sub),
            search: "?" + new URLSearchParams(formVal).toString()
        })
    }

    let variables = Object.assign({ name: props.sub }, router.query)
    if (variables.limit)
        variables.limit = parseInt(variables.limit)
    delete variables.sub
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_SUBREDDIT, {
        variables: variables
    });
    let loadingMessage = <RedditLayout key={props.sub + loading}><Row><Col></Col><Col><br /><br /><h4>Loading...</h4></Col><Col></Col></Row></RedditLayout>
    if (loading || networkStatus === NetworkStatus.refetch) return loadingMessage;
    if (error || !data.subreddit) return (
        <RedditLayout key={props.sub + !!error}>
            <Row><Col></Col><Col xs={"auto"}><br /><br /><h4>Error !</h4></Col><Col></Col></Row>
            <Row><Col></Col><Col xs={"auto"}><br /><br /><h4>{`${error}`}</h4></Col><Col></Col></Row>
        </RedditLayout>
    )

    return (
        <RedditLayout key={ props.sub + loading }>
            <SubredditHeader subreddit={data.subreddit}/>
            
            <Row className="mt-3">
                <Col>
                    <Form.Group>
                        <Form.Label>Limit by pages to</Form.Label>
                        <Form.Control as="select" value={formVal.limit} onChange={handleLimitChange} placeholder="Limit">
                            <option></option>
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Control as="select" value={formVal.sort} onChange={handleSortChange} placeholder="Sort by">
                            <option value="hot">Hot</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                            <option value="comments">Comments</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control as="select" value={formVal.time} onChange={handleTimeChange} placeholder="Time">
                            <option value="all">All</option>
                            <option value="year">Last year</option>
                            <option value="month">Last month</option>
                            <option value="week">Last week</option>
                            <option value="day">Last day</option>
                            <option value="hour">Last hour</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <h2>{data.subreddit.publications.length} publications found</h2>
            <CardColumns style={{ columnCount: 2 }}>
                    {data.subreddit.publications.map((publi, index) => {
                        if (index % 2 === 0) return (
                            <PublicationItem publication={publi} index={index} key={publi.id} />
                        )
                    })}
                    {data.subreddit.publications.map((publi, index) => {
                        if (index % 2 === 1) return (
                            <PublicationItem publication={publi} index={index} key={publi.id} />
                        )
                    })}
            </CardColumns>

            <style jsx>{`
                .card-columns {
                    column-count: 2 !important;
                }
                .header-icon-img {
                    max-height: 80px;
                    border-radius: 100%;
                }
                .header-title {
                    display: inline-block;
                }
            `}</style>
        </RedditLayout>
    )

}

export async function getStaticProps({ params }) {
    return {
        props: params,
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