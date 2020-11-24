import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';

import { favoritesVar } from '../utils/cache';

import ListGroup from 'react-bootstrap/ListGroup'

import FavoriteItem from './favorite-item'

export const USER_GET = gql`
	query USER_GET{
		User {
			id
			token
			email
			favorites {
                id
                name
            } 
		}
	}
`

/*export const FAVORITES = gql`
	query Favorites {
		favorites {
            name
        }
	}
`*/

export const GET_FAVORITES = gql`
	query GetFavorites {
		favorites @client
	}
`

export default function Master(props) {

	const { loading, error, data } = useQuery(GET_FAVORITES);

	if (loading) return <div>Loading</div>
	if (error) return <div>{`An error occurred, ${error}`}</div>
    if (!data) return <div>No data!</div>;
    
    const router = useRouter()
    
    //console.log("Master", router)

    return (
        <div>
            <h4 className="ma-2">Favorites</h4>
            <ListGroup variant="flush"  className="bg-light sidebar">
                {data.favorites.map(item => (
                    <FavoriteItem key={`${item.name}-${item.id}`} favorite={item} active={router.asPath === `/reddit/r/${item}`}/>
                ))}
            </ListGroup>
        </div>
    )

}