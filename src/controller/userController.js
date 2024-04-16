import asyncHandler from "express-async-handler";

const currentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json({
    data: user,
    message: "User details retrieved successfully.",
  });
});

export default currentUser;
