import Master from "../components/master";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RedditLayout extends React.Component {

	constructor(props) {
		super(props);
		this.children = props.children
		this.list = ["yolo", "test", "lol", "lolilol"]
	}

	render() {
		return (
			<div className="container-fluid myContainer">
				<Row className="heigh100">
					<Col xs={4} md={3} ><Master list={this.list} /></Col>
					<Col>{this.children}</Col>
				</Row>

				<style jsx>{`
				.myContainer {
					height: calc(100vh - 60px);
					width: 100%;
					display: flex;
					flex-direction: column;
					margin: 0;
					padding: 0;
				}
				.heigh100 {
					height: 100vh;
				}
			`}</style>
			</div>
		)
	}

}