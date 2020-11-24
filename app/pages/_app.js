import { ApolloProvider, ApolloClient, gql, useQuery } from '@apollo/client';
import Head from 'next/head'

import DefaultLayout from '../layout/default'
import { cache } from '../utils/cache';

import 'bootstrap/dist/css/bootstrap.css';

export default function MyApp({ Component, pageProps }) {

    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache,
        headers: {
            authorization: typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
        },
        typeDefs: gql`
            extend type Query {
                isLoggedIn: Boolean!
                favorites: [Subreddit!]!
            }
        `
    });

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Next & Graphql Skill Test</title>
                <link rel="icon" href="/logo.jpg" />
            </Head>

            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>

        </ApolloProvider>
    )
}
