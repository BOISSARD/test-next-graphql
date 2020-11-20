
export default class Master extends React.Component {

    constructor(props) {
      super(props);
      this.list = props.list
      //console.log("Master", this.list)
    }

    render() {
        return (
            <div>
                <h1>Bonjour, monde !</h1>
            </div>
        )
    }

}