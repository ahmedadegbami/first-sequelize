import express from "express";
import models from "../../db/models/index.js";
const { Like } = models;

const likeRouter = express.Router();

// Create route to like Product

likeRouter.post("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const like = await Like.create({ userId, productId });
    res.send(like);
  } catch (err) {
    next(err);
  }
});

// Create route to unlike Product
likeRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = Like.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({ rows });
  } catch (error) {
    next(error);
  }
});

export default likeRouter;
