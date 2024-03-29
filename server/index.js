import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/dbConnect.js";
import { authRouter } from "./routes/auth.route.js";
import {
  errorHandler,
  notFound,
} from "./middlewares/errorHandler.middleware.js";
import { userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { productRouter } from "./routes/product.route.js";
import morgan from "morgan";
import { brandRouter } from "./routes/brand.route.js";
import { productCategoryRouter } from "./routes/productCategory.route.js";
import { cartRouter } from "./routes/cart.router.js";
import { orderRouter } from "./routes/order.route.js";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

config();
const apiDocs = YAML.load("./api.yaml");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(apiDocs, {
    customSiteTitle: "JustShop",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
