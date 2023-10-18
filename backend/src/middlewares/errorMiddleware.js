const ErrorHandler = require("@utils/errorHandler");

const errorMiddleware = async (err, req, res, next) => {
	await ErrorHandler.handle(err, req, res, next);
};

module.exports = errorMiddleware;

