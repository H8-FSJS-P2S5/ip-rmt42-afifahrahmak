import PropTypes from 'prop-types'

export const Card = ({game}) => {
    return (
        <>
            <div className="profile-card-2">
                <a href={`${game.game_url}`}>
                    <img src={game.thumbnail} />
                    <div className="profile-name">{game.title}</div>
                </a>
            </div>
        </>
    )
}

Card.PropTypes = {
    game: {
        game_url: PropTypes.string,
        title: PropTypes.string,
        thumbnail: PropTypes.string
    }
}