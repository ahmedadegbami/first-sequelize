import Product from "./products.js";
import Review from "./reviews.js";
import Category from "./categories.js";
import ProductCategory from "./productCategories.js";
import User from "./users.js";
import Like from "./likes.js";

Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false }
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false }
});

User.hasMany(Review);
Review.belongsTo(User);

Product.belongsToMany(User, {
  through: { model: Like, unique: false }
});
User.belongsToMany(Product, {
  through: { model: Like, unique: false }
});

export default { Product, Review, Category, ProductCategory, User, Like };
