const jwt = require("jsonwebtoken")
const signToken = (payload => {
    return jwt.sign(payload, "SECRETCODE")
})

const verifyToken = (token => {
    return jwt.verify(token, "SECRETCODE")
})

module.exports = {signToken, verifyToken}