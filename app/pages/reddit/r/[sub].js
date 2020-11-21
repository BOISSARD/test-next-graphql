import { useRouter } from 'next/router'

import RedditLayout from '../../../layout/reddit'
import Master from "../../../components/master";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

export default class Subreddit extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            sub: props.sub,
        }
        console.log("Subreddit", props, this.state)
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        console.log("componentWillReceiveProps", oldProps, "=>", newProps)
        if(oldProps.sub !== newProps.sub) {
            console.log("avant setState", newProps.sub, this.state)
            this.setState({sub: newProps.sub})
            console.log("après setState", newProps.sub, this.state)
        }
    }

    render() {
        return (
            <RedditLayout key={this.state.sub}>
                <h1 className="title">/reddit/r/{this.state.sub}</h1>
            </RedditLayout>
        )
    }

}

export async function getStaticProps({ params }) {
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
}