import statusCodes from "../utils/statusCodes.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case statusCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.NOT_ALLOWED:
      res.json({
        title: "Method not allowed",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.UNSUPPORTED_MEDIA:
      res.json({
        title: "Unsupported media file",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.TOO_MANY_REQUESTS:
      res.json({
        title:
          "Too man requests to the server, please try again in a few minutes.",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.SERVER_ERROR:
      res.json({
        title: "Internal server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    case statusCodes.SERVICE_UNAVAILABLE:
      res.json({
        title: "Service Unavailable",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("Server is running...");
      res.json({
        title: "",
        message: err.message,
      })
      break;
  }
};

export default errorHandler;
