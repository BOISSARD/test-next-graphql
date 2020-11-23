import Link from 'next/link'
import { gql, useQuery } from '@apollo/client';

import { favouritesVar } from '../utils/cache';

import ListGroup from 'react-bootstrap/ListGroup'

import FavouriteItem from './favourite-item'

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

export const GET_FAVOURITES = gql`
	query GetFavorites {
		favourites @client
	}
`
export const FAVOURITES = gql`
	query Favorites {
		favourites {
            name
        }
	}
`

export const ADD_FAVOURITE = gql`
    mutation addFavourite($name: [String]!) {
        addFavourite(name: $name)
    }
`;

export const REMOVE_FAVOURITE = gql`
    mutation removeFavourite($name: [String]!) {
        removeFavourite(name: $name)
    }
`;

export default function Master(props) {

	const { loading, error, data } = useQuery(GET_FAVOURITES);

	if (loading) return <div>Loading</div>
	if (error) return <div>{`An error occurred, ${error}`}</div>
    if (!data) return <div>No data!</div>;
    
    console.log("Master", data.favourites)

    return (
        <div>
            <h4 className="ma-2">Favourites</h4>
            <ListGroup variant="flush"  className="bg-light sidebar">
                {data.favourites.map(item => (
                    <FavouriteItem key={item.name} favourite={item}/>
                ))}
            </ListGroup>
        </div>
    )

}