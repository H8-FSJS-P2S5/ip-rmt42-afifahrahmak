const errorHandler = {
    handler: (error, request, response, next) => {
        let statusCode, message;
        console.log(error)
        switch (error.name) {
            case 'SequelizeValidationError':
            case 'SequelizeUniqueConstraintError':
                statusCode = 400;
                message = error.errors.map(er => { return er.message });
                break;

            case 'EmptyUsername':
                statusCode = 400;
                message = `Username is required`;
                break;

            case 'EmptyEmail':
                statusCode = 400;
                message = `Email is required`;
                break;

            case 'EmptyPassword':
                statusCode = 400;
                message = `Password is required`;
                break;

            case 'EmptyEmailPassword':
                statusCode = 400;
                message = `Email/Password is required`;
                break;

            case 'googleAcc':
                statusCode = 400;
                message = `Use your Google account to login`;
                break;

            case 'ExistUserBooks':
                statusCode = 400;
                message = `Book has been exists`;
                break;

            case 'NotMatched':
                statusCode = 401;
                message = `Invalid Email/Password!`;
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