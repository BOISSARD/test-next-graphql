import Link from 'next/link'

import ListGroup from 'react-bootstrap/ListGroup'

export default function FavouriteItem (props) {

    return (
        <Link href={`/reddit/r/${props.favourite.name}`} key={props.favourite.name}><ListGroup.Item action >r/{props.favourite.name}</ListGroup.Item></Link>
    )

} 