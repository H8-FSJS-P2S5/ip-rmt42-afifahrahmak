import PropTypes from 'prop-types'

export const Table = ({ post }) => {
    return (
        <>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between">
                <div>
                    {post.title}
                    <p className="text-body-light" style={{fontSize: "12px"}}>{post.description}</p>
                </div>
                <span className="text-right mt-2" style={{color: post.status === 'Free' ? 'gray' : 'orange'}} >{post.status}</span>
            </a>
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

