import Link from 'next/link'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

export default class SubredditItem extends React.Component {

    constructor(props) {
        super(props);
        this.subreddit = props.subreddit
        //console.log("SubredditItem", this.subreddit)
    }

    render() {
        return (
            <div>
                <Card className="bg-dark text-white card mb-4" >
                    {/* style={{backgroundColor: this.subreddit.color}} */}
                    {!!this.subreddit.header &&
                        <div className="header-img-cover">
                            <img src={this.subreddit.header} className="header-img" />
                        </div>
                    }
                    <Card.Header>
                        <Row className="align-items-center" noGutters>
                            <Col xs>
                                {!!this.subreddit.header &&
                                    <img src={this.subreddit.icon} className="header-icon-img mr-4" />
                                }
                                <h4 className="header-title">{this.subreddit.name}</h4>
                            </Col>
                            <Col xs={"auto"}>
                                <Link href={`/reddit/r/${this.subreddit.name}`}><Button href={`/reddit/r/${this.subreddit.name}`} variant="outline-light" className="px-5">Link</Button></Link>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{this.subreddit.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col sm={6}>
                                {/* <Card.Text>Since the {moment(this.subreddit.date * 1000).format("DD MMMM YYYY")}</Card.Text> */}
                            </Col>
                            <Col sm={6}>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                <style jsx>{`
                    .header-img-cover {
                        background-image: url('${this.subreddit.header}');
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    .header-img {
                        width: 100%;
                        max-height: 150px;
                        visibility: hidden;
                    }
                    .header-icon-img {
                        max-height: 80px;
                        border-radius: 100%;
                    }
                    .header-title {
                        display: inline-block;
                    }
                `}</style>
            </div>
        )
    }

}