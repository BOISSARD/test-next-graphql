import Link from 'next/link'

import ListGroup from 'react-bootstrap/ListGroup'

export default class Master extends React.Component {

    constructor(props) {
        super(props);
        this.list = props.list
        //console.log("Master", this.list)
    }

    render() {
        return (
            <ListGroup variant="flush"  className="bg-light sidebar">
                {this.list.map(item => (
                    <Link href={`/reddit/r/${item}`} key={item}><ListGroup.Item action >{item}</ListGroup.Item></Link>
                ))}
            </ListGroup>
        )
    }

}