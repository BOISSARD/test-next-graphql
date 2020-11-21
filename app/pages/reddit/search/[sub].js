import Router from 'next/router'
import SearchLayout from '../../../layout/search'

export default class SearchSubreddit extends React.Component {

    constructor(props) {
        super(props);
        console.log("SearchSubreddit", props)
    }

    render() {
        return (
            <SearchLayout>
                <h2>Sub</h2>
            </SearchLayout>
        )
    }

}