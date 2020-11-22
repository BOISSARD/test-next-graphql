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

const SUBREDDITS_SEARCH = gql`
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
    //console.log("SearchSubreddit", props, sub, variables)
    const { loading, error, data, refetch, networkStatus } = useQuery(SUBREDDITS_SEARCH, {
        variables: variables //{ keyword: sub }//variables
    });

    if (error || loading || networkStatus === NetworkStatus.refetch) return null;
    //if (error) return `Error ! ${error}`;
    if (data) console.log("data", data, data && data.search.length)

    return (
        <SearchLayout key={sub}>
            <h2>Search for "{sub}"</h2>
            <Row>
                {data && data.search && data.search.map(sub => (
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