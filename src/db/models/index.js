import Product from "./products.js";
import Review from "./reviews.js";
import Category from "./categories.js";
import ProductCategory from "./productCategories.js";
import User from "./users.js";

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

export default { Product, Review, Category, ProductCategory, User };
