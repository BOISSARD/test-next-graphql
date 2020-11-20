import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'

export default class Master extends React.Component {

    constructor(props) {
      super(props);
      this.list = props.list
      //console.log("Master", this.list)
    }

    render() {
        return (
            <div>
                <Nav className="flex-column">
                    <Nav.Link href="/reddit/r/test">test</Nav.Link>
                    <Nav.Link href="/reddit/r/yolo">yolo</Nav.Link>
                    <Nav.Link href="/reddit/r/lol">lol</Nav.Link>
                    <Nav.Link href="/reddit/r/lolilol">lolilol</Nav.Link>
                </Nav>
            </div>
        )
    }

}