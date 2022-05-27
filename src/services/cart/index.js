import express from "express";
import models from "../../db/models/index.js";
import sequelize from "sequelize";

const { Cart, Product } = models;

const cartRouter = express.Router();

// Create route to add Product to Cart
cartRouter.post("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.create({ userId, productId });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// Create route to get all Products in Cart
cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      include: [
        {
          model: Product
        }
      ],
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("cart.id")), "unitQty"],
        [sequelize.fn("sum", sequelize.col("product.price")), "unitTotalPrice"]
      ],

      group: ["productId", "product.id"],

      where: {
        userId: req.params.userId
      }
    });

    const totalQty = await Cart.count({
      where: {
        userId: req.params.userId
      }
    });

    const totalSum = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] }
    });

    res.send({ data, totalQty, totalSum });
  } catch (err) {
    next(err);
  }
});

export default cartRouter;
