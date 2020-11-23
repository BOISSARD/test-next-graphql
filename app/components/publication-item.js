import Link from 'next/link'
import moment from 'moment'
import { AllHtmlEntities } from "html-entities";

import CommentItem from './comment-item';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default class PublicationItem extends React.Component {

    constructor(props) {
        super(props);
        this.publication = props.publication
        this.index = props.index
        this.entities = new AllHtmlEntities()
        this.state = {
            expand: false
        }
        // console.log("PublicationItem", this.publication)
    }

    render() {
        return (
                <Card className="mb-4" >
                    <Card.Header>
                        {/* {this.index} */}
                        <Card.Title className="h6">{this.publication.title}</Card.Title>
                        <Card.Text className="text-right"><span className="blockquote-footer">By {this.publication.author}</span></Card.Text>
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
                            {/* <Col>Commentaires {this.publication.id}</Col> */}
                        <Row className="align-items-center" noGutters>
                            <Col>Commentaires : {this.state.expand}</Col>
                            <Col>
                            <Button
                                variant="link"
                                onClick={() => this.setState({expand: !this.state.expand})}
                                aria-controls={`collapse-commentaires-${this.publication.id}`}
                                aria-expanded={this.state.expand}
                            >
                                {this.state.expand ? <FaChevronUp /> : <FaChevronDown/> }
                            </Button>
                            </Col>
                        </Row>
                        <Collapse in={this.state.expand}>
                        <div id={`collapse-commentaires-${this.publication.id}`}>
                        { this.publication.comments.slice(0, 3).map(comm =>
                            <CommentItem comment={comm} index={this.publication.id} key={comm.id} />
                        )}
                        </div>
                        </Collapse>
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