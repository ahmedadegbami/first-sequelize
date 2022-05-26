import express from "express";
import models from "../../db/models/index.js";
const { Category } = models;

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.post("/bulk", async (req, res, next) => {
  try {
    const newCategories = await Category.bulkCreate([
      { name: "Electronics" },
      { name: "Phones" },
      { name: "Shoes" },
      { name: "Books" }
    ]);
    res.send(newCategories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default categoryRouter;
