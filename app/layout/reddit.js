import Master from "../components/master";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default class RedditLayout extends React.Component {

	constructor(props) {
		super(props);
		this.children = props.children
		this.list = ["yolo", "test"]
		this.classes = makeStyles((theme) => ({
			drawer: {
			  width: 240,
			  flexShrink: 0,
			  marginTop: 100,
			},
			drawerPaper: {
			  width: 240,
			},
			content: {
			  flexGrow: 1,
			  padding: theme.spacing(3),
			},
			center: {
				textAlign: 'center',
			}
		}));
	}

	render() {
		return (
			<div className="bg-white antialiased">
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<Master list={this.list} />
					</Grid>
					<Grid item xs={8}>
						<Box justifyContent="center">
							{this.children}
						</Box >
					</Grid>
				</Grid>

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

			</div>
		)
	}

}