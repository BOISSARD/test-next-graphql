import Master from "../components/master";

export default class RedditLayout extends React.Component {

	constructor(props) {
		super(props);
		this.children = props.children
		this.list = ["yolo", "test"]
	}

	render() {
		return (
			<div className="container">
				<div className="bg-white antialiased">
					<Master list={this.list} />
					<div className="mt-6 sm:mt-0 sm:py-12">{this.children}</div>
				</div>
			</div>
		)
	}

}