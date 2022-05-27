import express from "express";
import models from "../../db/models/index.js";
const { Like } = models;

const likeRouter = express.Router();

// Create route to like Product
likeRouter.post("/", async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    const like = await Like.create({
      productId,
      userId
    });
    res.send(like);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default likeRouter;

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
