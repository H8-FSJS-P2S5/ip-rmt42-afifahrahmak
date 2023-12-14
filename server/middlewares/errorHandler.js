function errorHandler(err, req, res, next) {
    // console.log(err)
    switch(err.name) {
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: "Email must be unique"})
            break
        case "SequelizeValidationError":
            res.status(400).json({message: err.errors[0].message})
            break
        case "Email is required":
        case "Password is required":
            res.status(400).json({message: err.name})
            break
        case "Unauthenticated":
        case "JsonWebTokenError":
            res.status(401).json({message: "Unauthenticated"})
            break
        case "Invalid email or password":
            res.status(401).json({message: err.name})
            break
        case "Transaction failed":
            res.status(402).json({message: err.name})
            break
        case "Forbidden":
            res.status(403).json({message: "You are not authorized"})
            break
        case "Data not found":
            res.status(404).json({message: err.name})
            break
        default:
            res.status(500).json({message: "Internal server error"})
    }
}

module.exports = errorHandler