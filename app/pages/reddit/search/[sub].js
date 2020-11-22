import Router from 'next/router'
import SearchLayout from '../../../layout/search'

import { gql, useQuery, NetworkStatus } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import SubredditItem from '../../../components/subreddit-item';

const SUBREDDITS_SEARCH = gql`
    query search($keyword: String!, $limit: Int) {
        search(keyword: $keyword, limit: $limit) {
            id
            name
            title
            description
            date
            header
            icon
        }
    }
`;

export default function SearchSubreddit(props) {
    let sub = props.sub
    const { loading, error, data, refetch, networkStatus } = useQuery(SUBREDDITS_SEARCH, {
        variables: { keyword: sub, limit: 10 },
    });
    //console.log("SearchSubreddit", props, sub)

    if (loading || networkStatus === NetworkStatus.refetch) return null;
    if (error) return `Error ! ${error}`;
    if (data) console.log("data", data, data && data.search.length)

    return (
        <SearchLayout key={sub}>
            <h2>Search for "{sub}"</h2>
            {data && data.search && data.search.map(sub => (
                <SubredditItem key={sub.id} subreddit={sub}/>
            ))}
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
            { params: { sub: '*' } }
        ],
        fallback: true
    };
}