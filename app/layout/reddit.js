import Master from "../components/master";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class RedditLayout extends React.Component {

	constructor(props) {
		super(props);
		this.children = props.children
		this.list = ["Home", "gaming", "aww", "nexistepasenfinnormalement"]
	}

	render() {
		return (
			<div className="container-fluid myContainer">
				<Row className="heigh100" noGutters>
					<Col xs={12} md={3} style={{borderRight: "solid lightgrey 1px"}}><Master list={this.list} /></Col>
					<Col><Container>{this.children}</Container></Col>
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