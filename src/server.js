import cors from "cors";
import express from "express";
import { testDB } from "./db/index.js";
import productRouter from "./services/products/index.js";
import reviewRouter from "./services/reviews/index.js";
import usersRouter from "./services/users/index.js";
import categoryRouter from "./services/categories/index.js";
import likeRouter from "./services/likes.js/index.js";
import cartRouter from "./services/cart/index.js";
import sequelize from "./db/index.js";
import listEndpoints from "express-list-endpoints";

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
server.use("/users", usersRouter);
server.use("/categories", categoryRouter);
server.use("/likes", likeRouter);
server.use("/cart", cartRouter);

const { PORT = 5002 } = process.env;

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
      await testDB();
      // await sequelize.sync({ force: true });
      await sequelize.sync();
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
