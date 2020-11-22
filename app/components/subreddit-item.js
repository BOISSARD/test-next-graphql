import Link from 'next/link'

import ListGroup from 'react-bootstrap/ListGroup'

export default class SubredditItem extends React.Component {

    constructor(props) {
        super(props);
        this.subreddit = props.subreddit
        //console.log("SubredditItem", this.subreddit)
    }

    render() {
        return (
            <div>
                <h5>{this.subreddit.name}</h5>
                <img src={this.subreddit.icon} style={{ height: 100, width: 100 }} />            
            </div>
        )
    }

}