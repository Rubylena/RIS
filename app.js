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
import authRouter from "./src/routes/v1/auth.js";

const PORT = process.env.PORT;

const app = express();
connectToMongoDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our RIS API homepage!");
  res
    .setHeader({
      "Content-Type": "application/json",
    })
    .send();
});

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.get("/api/v1", (req, res) => {
  res.status(200).send("Welcome to our RIS v1 API homepage!");
});

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RIS is listening on port:${PORT}`);
});
