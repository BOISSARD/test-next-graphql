
import Link from 'next/link'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LinkUI from '@material-ui/core/Link';

export default class Master extends React.Component {

    constructor(props) {
      super(props);
      this.list = props.list
      //console.log("Master", this.list)
    }

    render() {
        return (
            <div>
                <List>
                    <ListItem><Link href="/reddit/r/test"><LinkUI href="">test</LinkUI></Link></ListItem>
                    <ListItem><Link href="/reddit/r/yolo"><LinkUI href="">yolo</LinkUI></Link></ListItem>
                    <ListItem><Link href="/reddit/r/lol"><LinkUI href="">lol</LinkUI></Link></ListItem>
                    <ListItem><Link href="/reddit/r/lolilol"><LinkUI href="">lolilol</LinkUI></Link></ListItem>
                </List>
            </div>
        )
    }

}