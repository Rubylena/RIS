import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    throw new Error("User is not authorized or token is missing.");
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_ACCESS, (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error("Failed to authenticate token.");
      }

      req.user = decoded;
      next();
    });
  }
});

export default authenticate;
