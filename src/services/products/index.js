import express from "express";
import models from "../../db/models/index.js";
const { Product, Review } = models;
import createError from "http-errors";

const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: { model: Review, attributes: ["text", "username"] }
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: Review
    });
    if (!product) {
      res.status(404).send("Not found");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({ rows });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
