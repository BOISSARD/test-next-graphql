import Router from 'next/router'
import SearchLayout from '../../../layout/search'

export default class SearchDefault extends React.Component {

    constructor(props) {
        super(props);
        console.log("SearchDefault", props)
    }

    render() {
        return (
            <SearchLayout>
                <h2>Index</h2>
            </SearchLayout>
        )
    }

}