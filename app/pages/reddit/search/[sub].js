import { useRouter } from 'next/router'

import { gql, useQuery, NetworkStatus } from '@apollo/client';

import SearchLayout from '../../../layout/search'
import SubredditItem from '../../../components/subreddit-item';

import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

const SEARCH_SUBREDDITS = gql`
    query search($keyword: String!, $limit: Int, $sort: String, $time: String, $after: String) {
        search(keyword: $keyword, limit: $limit, sort: $sort, time: $time, after: $after) {
            id
            name
            title
            description
            header
            icon
            color
        }
    }
`;

export default function SearchSubreddit(props) {
    const router = useRouter()
    let sub = props.sub

    let variables = Object.assign({ keyword: sub}, router.query)
    if(variables.limit)
        variables.limit = parseInt(variables.limit)
    delete variables.sub

    const { loading, error, data, refetch, networkStatus } = useQuery(SEARCH_SUBREDDITS, {
        variables: variables //{ keyword: sub }//variables
    });

    let loadingMessage = <SearchLayout key={props.sub + loading}><Row><Col></Col><Col><br /><br /><h4>Loading...</h4></Col><Col></Col></Row></SearchLayout>
    // let content = null

    if (loading || networkStatus === NetworkStatus.refetch) return loadingMessage;
    if (error) return (
        <SearchLayout key={props.sub + !!error}>
        <Row><Col></Col><Col xs={"auto"}><br /><br /><h4>Error !</h4></Col><Col></Col></Row>
        <Row><Col></Col><Col xs={"auto"}><br /><br /><h4>{`${error}`}</h4></Col><Col></Col></Row>
        </SearchLayout>
    )
    console.log("data", data, data && data.search.length)
    // if(data && data.search) 
    //     content = (
    //         <Row>
    //             {data.search.map(sub => (
    //                 <Col xs={12} key={sub.id}>
    //                     <SubredditItem subreddit={sub}/>
    //                 </Col>
    //             ))}
    //         </Row>
    // )

    return (
        <SearchLayout key={sub}>
            <h2>Search for "{sub}", {data.search.length} found</h2>
            {/* {content} */}
            <Row>
                {data.search.map(sub => (
                    <Col xs={12} key={sub.id}>
                        <SubredditItem subreddit={sub}/>
                    </Col>
                ))}
            </Row>
        </SearchLayout>
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
            { params: { sub: '*', limit: '*', sort: '*', time: '*' } }
        ],
        fallback: true
    };
}