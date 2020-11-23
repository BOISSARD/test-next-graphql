import Link from 'next/link'
import moment from 'moment'
import { AllHtmlEntities } from "html-entities";

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default class CommentItem extends React.Component {

    constructor(props) {
        super(props);
        this.comment = props.comment
        this.index = props.index
        this.entities = new AllHtmlEntities()
        //console.log("CommentItem", this.comment)
    }

    render() {
        if(!this.comment || (!this.comment.message && !this.comment.date)) return null
        return (
            <div className="mb-4 mt-2">
            <div className="border-dark border-left border-bottom px-3" style={{borderWidth: "2px !important"}}>
                <small className="text-muted">By <em>{this.comment.author}</em> at <em>{moment(this.comment.date * 1000).format('DD/MM/YYYY hh:mm:ss')}</em><Badge variant="secondary" className="ml-1"><span className="mr-1">{this.comment.ups}</span><FaThumbsUp/></Badge></small>
                <div dangerouslySetInnerHTML={{ __html: this.entities.decode(this.comment.message) }} />
                { this.comment.replies && this.comment.replies.slice(0, 5).map(comm =>
                    <CommentItem comment={comm} key={comm.id} />
                )}
            </div>
            </div>
        )
    }

}