import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/config/swagger.js";
import connectToMongoDb from "./src/config/db_config.js";
import errorHandler from "./src/middleware/errorHandler.js";
import adminAuthRouter from "./src/routes/v1/authAdmin.js";
import contactRouter from "./src/routes/v1/contact.js";
import userRouter from "./src/routes/v1/user.js";
import employeeAuthRouter from "./src/routes/v1/authEmployee.js";

const PORT = process.env.PORT;

const app = express();
connectToMongoDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our RIS API homepage!");
});

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use(
  "/api/v1/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.get("/api/v1", (req, res) => {
  res.status(200).send("Welcome to our RIS v1 API homepage!");
});

app.use("/api/v1/auth/admin", adminAuthRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth/employee", employeeAuthRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RIS is listening on port:${PORT}`);
});
