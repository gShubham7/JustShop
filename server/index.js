import { config } from "dotenv";
import express from "express";
import { dbConnect } from "./config/dbConnect.js";
import { authRouter } from "./routes/auth.route.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { userRouter } from "./routes/user.route.js";

const PORT = process.env.PORT || 8080;
const app = express();

config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
