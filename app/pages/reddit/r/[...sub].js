import { useRouter } from "next/router"
import RedditLayout from '../../../layout/reddit'

export default class Subreddit extends React.Component {

    constructor(props) {
        super(props);
        this.sub = "test"
        console.log("Subreddit", props)
    }

    async getStaticPaths() {
        // Return a list of possible value for id
        console.log("getStaticPaths")
    }

    async getStaticProps({ params }) {
        // Fetch necessary data for the blog post using params.id
        console.log("getStaticProps", params)
    }

    render() {
        return (
            <RedditLayout>
                <h1 className="title">
                    /reddit/r/{this.sub}
                </h1>
            </RedditLayout>
        )
    }

}