import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Table = ({ post }) => {
    return (
        <>
            <Link to={`/post/${post.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
                <div>
                    {post.title}
                    <p className="text-body-light" style={{fontSize: "12px"}}>{post.description}</p>
                </div>
                <span className="text-right mt-2" style={{color: post.status === 'Free' ? 'gray' : 'orange'}} >{post.status}</span>
            </Link>
        </>
    )
}

Table.propTypes = {
    post: {
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
    }
}

