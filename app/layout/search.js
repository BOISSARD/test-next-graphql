import RedditLayout from './reddit'

import Router from 'next/router'

export default class SearchLayout extends React.Component {

    static async getInitialProps({query}) {
        return query
    }

    constructor(props) {
        super(props);
        this.children = props.children
        this.state = {
            subreddit: props.subreddit
        }
        console.log("SearchLayout", props, this.state)
    }

    render() {
        return (
            <RedditLayout>
                <h1 className="title">
                    /reddit/search
                </h1>
                {this.children}
            </RedditLayout>
        )
    }
}