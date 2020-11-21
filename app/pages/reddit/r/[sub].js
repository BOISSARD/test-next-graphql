
import React, { useState, useEffect } from 'react';
//import Router from 'next/router'
import { useRouter } from 'next/router'
import RedditLayout from '../../../layout/reddit'

// export default class Subreddit extends React.Component {
export default function Subreddit(props) {
    /*static async getInitialProps({query}) {
        return query
    }*/

    /*static async getStaticProps() {
        return {
            paths: [
                { params: { sub: ["*"] } },
            ],
            fallback: true
        };
    }*/

    /*constructor(props) {
        super(props);
        this.router = useRouter()
        //const { pid } = router.query
        this.state = {
            // sub: props.sub
            sub: props.sub
        }
        console.log("Subreddit", props, router, this.state)
    }*/

    const router = useRouter();
    console.log(router.query) 
    this.state = {
        sub : router.query.sub
    }

    // render() {
        return (
            <RedditLayout>
                <h1 className="title">
                    /reddit/r/ {router.query.sub}
                    {/* {this.state.sub} */}
                </h1>
            </RedditLayout>
        )
    // }

}

/*export async function getStaticProps({ params }) {
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
}*/