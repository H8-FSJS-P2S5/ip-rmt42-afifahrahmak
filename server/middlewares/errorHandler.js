module.exports = function errorHandler(error, req, res, next) {

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: error.errors[0].message });
            break;

        case "JsonWebTokenError":
        case "Unauthenticated":
            res.status(401).json({ message: error.message ?? "Unauthenticated" });
            break;

        case "NotFound":
            res.status(404).json({ message: error.message ?? "Data not found" }); //cusine -> error
            break;

        default:
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }

}