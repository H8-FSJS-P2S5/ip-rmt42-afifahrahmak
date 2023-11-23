
function errorHandler(error, req, res, next) {
    switch (error.name) {
        case 'BadRequest':
            res.status(400).json({message: error.message})
            break;
        case 'Unauthorized':
            res.status(401).json({message: error.message})
            break;
        case 'NotFound':
            res.status(404).json({message: error.message})
            break;
        case 'Conflict':
            res.status(409).json({message: error.message})
            break;
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            if (error.errors[0].message === 'email must be unique') {
                res.status(400).json({message: 'Email already exist'})
            } else if (error.errors[0].message === 'username must be unique') {
                res.status(400).json({message: 'Username already exist'})
            } else {
                res.status(400).json({message: error.errors[0].message})
            }
            break;
        case 'Unauthenticated':
            res.status(401).json({message: 'You are unauthenticated'})
            break;
        case 'Forbidden':
            res.status(403).json({message: error.message})
            break;
        default:
            res.status(500).json({message: 'Internal Server Error'})
            break;
    }
}

module.exports = errorHandler