import Link from 'next/link'
import { gql, useQuery } from '@apollo/client';

import ListGroup from 'react-bootstrap/ListGroup'

export const USER_GET = gql`
	query USER_GET{
		User {
			id
			token
			email
			favourites {
				name
			}
		}
	}
`

export default function Master(props) {

	const { loading, error, data } = useQuery(USER_GET);

	if (loading) return <div>Loading</div>
	if (error) return <div>{`An error occurred, ${error}`}</div>
    if (!data) return <div>No data!</div>;
    
    console.log("Master", data)

    return (
        <div>
            <h3 className="ma-2">Favourites</h3>
        <ListGroup variant="flush"  className="bg-light sidebar">
            {/* {props.list.map(item => (
                <Link href={`/reddit/r/${item}`} key={item}><ListGroup.Item action >{item}</ListGroup.Item></Link>
            ))} */}
        </ListGroup>
        </div>
    )

}