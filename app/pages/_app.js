import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.css';

import DefaultLayout from '../layout/default'

export default function MyApp({ Component, pageProps }) {

    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Next Skill Test</title>
                <link rel="icon" href="/logo.jpg" />
            </Head>

            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>

        </ApolloProvider>
    )
}
