module.exports = function errorHandler(error, req, res, next) {

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: error.errors[0].message});
            break;

        case "IncompleteData":
            res.status(400).json({ message: error.message });
            break;

        case "JsonWebTokenError":
        case "Unauthenticated":
            res.status(401).json({ message: error.message ?? "Unauthenticated" });
            break;

        case "AxiosError":
            res.status(404).json({ message: "Recipe not found" });
            break;

        default:
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }

}