const errorHandler = {
    handler : (error, request, response, next) => {
        let statusCode, message;

        switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400;
            message = error.errors.map(er => {
                                return er.message;  
                            });
            break;

        case 'EmptyEmail':
            statusCode = 400;
            message = `Email must be exist`;
            break;

        case 'EmptyPassword':
            statusCode = 400;
            message = `Password must be exist`;
            break;

        case 'Error':
            statusCode = 400;
            message = `Unsupported ZIP file`;
            break;

        case 'NotMatched':
            statusCode = 401;
            message = `Invalid password/email!`;
            break;

        case 'JsonWebTokenError':
        case 'Unauthenticated':
            statusCode = 401;
            message = `Unauthenticated`;
            break;

        case 'Unauthorized':
            statusCode = 403;
            message = `You're not authorized`;
            break;

        case 'NotFound':
            statusCode = 404;
            message = `Not Found`;
            break;
    
        default:
            statusCode = 500;
            message = `Internal Server Error`;
            break;
        }

        response.status(statusCode).json({ message });
    }
    
}

module.exports = errorHandler;