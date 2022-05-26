import cors from "cors";
import express from "express";
import { testDB } from "./db/index.js";
import sequelize from "./db/index.js";
import Product from "./db/models/products.js";
import Review from "./db/models/reviews.js";
import productRouter from "./services/products/index.js";
import reviewRouter from "./services/reviews/index.js";

import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  genericErrorHandler
} from "./errorHandlers.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use("/products", productRouter);
server.use("/reviews", reviewRouter);

const { PORT = 5001 } = process.env;

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
      await testDB();
      await sequelize.sync({ force: true });
      //   await sequelize.sync({ alter: true });
      //   await Product.sync({ force: false });
      //   await Review.sync({ force: false });
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initalize();
