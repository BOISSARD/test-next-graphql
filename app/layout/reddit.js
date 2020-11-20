import Master from "../components/master";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RedditLayout extends React.Component {

	constructor(props) {
		super(props);
		this.children = props.children
		this.list = ["yolo", "test"]
	}

	render() {
		return (
			<div className="bg-white antialiased">
				<Row>
					<Col md="4" lg="3" className="d-md-block bg-light sidebar collapse">
						<Master list={this.list} />
					</Col>
					<Col>
						<div className="container">
							{this.children}
						</div>
					</Col>
				</Row>

			</div>
		)
	}

}