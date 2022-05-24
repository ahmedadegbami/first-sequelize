import cors from "cors";
import express from "express";
import { testDB } from "./db/index.js";
import sequelize from "./db/index.js";
import Product from "./db/models/products.js";
import Review from "./db/models/reviews.js";

const server = express();
server.use(express.json());
server.use(cors());

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
      await testDB();
      await sequelize.sync({ alter: false });
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
