import express from "express";
import models from "../../db/models/index.js";
import createError from "http-errors";

const { Product, Review } = models;

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({});
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      res.status(404).send("Not found");
    } else {
      res.send(review);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = Review.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({ rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewRouter;
