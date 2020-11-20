import Router from 'next/router'
import RedditLayout from '../../../layout/reddit'

export default class Subreddit extends React.Component {

    static async getInitialProps({query}) {
        return query
    }

    constructor(props) {
        super(props);
        this.state = {
            sub: props.sub
        }
        console.log("Subreddit", props, this.state)
    }

    render() {
        return (
            <RedditLayout>
                <h1 className="title">
                    /reddit/r/{this.state.sub}
                </h1>
            </RedditLayout>
        )
    }

}