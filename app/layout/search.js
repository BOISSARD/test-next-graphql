import RedditLayout from './reddit'

import { useRouter } from 'next/router'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

// export default class SearchLayout extends React.Component {
export default function SearchLayout(props) {

    const router = useRouter()
    var formVal = router.query
    delete formVal.sub

    function handleLimitChange(event) {
        formVal.limit = event.target.value
        console.log("Subreddit handleLimitChange", event.target.value, formVal, router.pathname, props.sub)
        router.push({
            pathname: router.pathname.replace("[sub]", props.sub),
            search: "?" + new URLSearchParams(formVal).toString()
        })
        /*router.push({
            pathname: router.pathname.replace("[sub]", sub),
            search: "?" + new URLSearchParams(Object.assign({}, formVal, {limit : event.target.value})).toString()
        })*/
    }
    /*function handleSortChange(event) {
        //console.log("handleSortChange", event.target.value, new URLSearchParams(Object.assign({}, formVal, {sort : event.target.value})).toString(), router)
        router.push({
            pathname: router.pathname.replace("[sub]", sub),
            search: "?" + new URLSearchParams(Object.assign({}, formVal, {sort : event.target.value})).toString()
        })
    }
    function handleTimeChange(event) {
        //console.log("handleTimeChange", event.target.value, new URLSearchParams(Object.assign({}, formVal, {time : event.target.value})).toString(), router)
        router.push({
            pathname: router.pathname.replace("[sub]", sub),
            search: "?" + new URLSearchParams(Object.assign({}, formVal, {time : event.target.value})).toString()
        })
    }*/
    
    return (
        <RedditLayout>
            <Row className="align-items-center">
                <Col xs={"auto"}>
                    <Form.Label>Limit by pages to</Form.Label>
                </Col>
                <Col xs={"auto"}>
                    <Form.Control as="select" value={formVal.limit || 25} onChange={handleLimitChange} placeholder="Limit">
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </Form.Control>
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Limit by pages to</Form.Label>
                        <Form.Control as="select" value={formVal.limit} onChange={handleLimitChange} placeholder="Limit">
                            <option></option>
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Control as="select" value={formVal.sort} onChange={handleSortChange} placeholder="Sort by">
                            <option value="relevance">Relevance</option>
                            <option value="hot">Hot</option>
                            <option value="top">Top</option>
                            <option value="new">New</option>
                            <option value="comments">Comments</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control as="select" value={formVal.time} onChange={handleTimeChange} placeholder="Time">
                            <option value="all">All</option>
                            <option value="year">Last year</option>
                            <option value="month">Last month</option>
                            <option value="week">Last week</option>
                            <option value="day">Last day</option>
                            <option value="hour">Last hour</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row> */}
            {/* <div style={{overflowY: "scroll"}}> */}
                {props.children}
                {/* {props.children} */}
            {/* </div> */}
        </RedditLayout>
    )
}

export async function getStaticProps({ params }) {
    return {
        props: params,
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