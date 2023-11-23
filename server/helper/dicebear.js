const fetch = require('node-fetch')


async function getProfileImg(style, seed) {
    try {
        const response = await fetch(`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`)
        if (response.ok) {
            return response.url
        }
    } catch (error) {
        throw ('Failed to get avatar')
    }
}

module.exports = getProfileImg