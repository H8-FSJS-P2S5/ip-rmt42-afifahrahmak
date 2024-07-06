function errorHandler(error, req, res, next) {
    let statusCode, message
console.log("ini middleware error", error)
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = error.errors.map((el) => {return el.message})
            break;
        case 'EmailPasswordNull':
            statusCode = 400   
            message = "Please insert Email and Password"
            break
        case 'EmailInvalid':
        case 'PasswordInvalid':
            statusCode = 400    
            message = "Invalid E-Mail / Password"
            break

        case "JsonWebTokenError":
        case "Unauthenticated":
            statusCode = 401
            message = "Unauthenticated"
            break;
        case "Unauthorized":
            statusCode = 403
            message = "Unauthorized"
            break;
        case "Forbidden":
            statusCode = 403
            message = "You are not authorized"
            break;
        case "NotFound":
            statusCode = 404
            message = "Data not found"
            break;
        
        default:
            statusCode = 500
            message = "Internal server error"
            break;
    }
    console.log("=",statusCode)
    res.status(statusCode).json({message})
}

module.exports = errorHandler