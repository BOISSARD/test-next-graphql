import Link from 'next/link'
import moment from 'moment'
import { AllHtmlEntities } from "html-entities";

import CommentItem from './comment-item';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default class PublicationItem extends React.Component {

    constructor(props) {
        super(props);
        this.publication = props.publication
        this.index = props.index
        this.entities = new AllHtmlEntities()
        // console.log("PublicationItem", this.publication)
    }

    render() {
        return (
                <Card className="mb-4" >
                    <Card.Header>
                        {/* {this.index} */}
                        <Card.Title className="h6">{this.publication.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {/* {JSON.stringify(this.publication)}<br/> */}
                        <a href={this.publication.media.url}>{this.publication.media.url_type ? this.publication.media.url_type + "  : " : ""}{this.publication.media.url}</a>
                        { this.publication.media.url_type && this.publication.media.url_type.includes("link") && this.publication.media.thumbnail &&
                            <Image src={this.publication.media.thumbnail} fluid />
                        }
                        { (this.publication.media.url_type && this.publication.media.url_type.includes("video")) ? this.publication.media.video ? (
                                <Player>
                                    <source src={this.publication.media.video} />
                                </Player>
                            ) : this.publication.media.url ? (
                                <Player>
                                    <source src={this.publication.media.url} />
                                </Player>
                            ) : null : null
                        }
                        { this.publication.media.url_type && this.publication.media.url_type.includes("image") ?
                            this.publication.media.video ? (
                                <Player>
                                    <source src={this.publication.media.video} />
                                </Player>
                            ) : this.publication.media.url ? (
                                <Image src={this.publication.media.url} fluid />
                            ) : null : null
                        }

                        {this.publication.text &&
                            <div dangerouslySetInnerHTML={{ __html: this.entities.decode(this.publication.text) }} />
                        }
                    </Card.Body>
                    <hr />
                    <Card.Body>
                        {/* {JSON.stringify(this.publication.comments[0])} */}
                        {/* { this.publication.comments.map((comm, index) => {
                            <p key={comm.id}>{JSON.stringify(comm)}</p>
                            // <CommentItem comment={comm} index={index} key={comm.id} />
                        })} */}
                        <CommentItem comment={this.publication.comments[0]} />
                        <CommentItem comment={this.publication.comments[1]} />
                        <CommentItem comment={this.publication.comments[2]} />
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Card.Text>{moment(this.publication.date * 1000).format('DD/MM/YYYY hh:mm:ss')}</Card.Text>
                            </Col>
                            <Col xs={"auto"}>
                                <Badge variant={this.publication.ups_ratio >= 0.5 ? 'success' : 'danger'}>
                                    <span className="mr-1">{Math.round(this.publication.ups)}</span>
                                    {this.publication.ups_ratio >= 0.5 ? <FaThumbsUp/> : <FaThumbsDown />}
                                </Badge>
                            </Col>
                            {this.publication.from &&
                                <Col xs={"auto"}>
                                    <Card.Text><Link href={`/reddit/r/${this.publication.from.subreddit}`}><a className="blockquote-footer" style={{ textDecoration: "none" }}>/r/{this.publication.from.subreddit}</a></Link></Card.Text>
                                </Col>
                            }
                        </Row>
                    </Card.Footer>
                </Card>
        )
    }

}