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
				<Row style={{height: "100vh"}} noGutters>
					<Col xs={12} md={3} xl={2} style={{borderRight: "solid lightgrey 1px", overflowY: "scroll"}}><Master list={this.list}/></Col>
					<Col xs={12} md={9} xl={10}><Container>{this.children}</Container></Col>
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
				.scroll {
					overflow-y: scroll
				}
			`}</style>
			</div>
		)
	}

}