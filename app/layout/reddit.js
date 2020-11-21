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
					{/* <Grid container spacing={3}>
						<Grid item xs={3}>
							<Master list={this.list} />
						</Grid>
						<Grid item xs={8}>
							<Box justifyContent="center">
								{this.children}
							</Box >
						</Grid>
					</Grid> */}

					{/* <Drawer
						className={this.classes.drawer}
						variant="permanent"
						anchor="left"
					>
						<Master list={this.list} />
					</Drawer>
					<main className={this.classes.content}>
						{this.children}
					</main> */}
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