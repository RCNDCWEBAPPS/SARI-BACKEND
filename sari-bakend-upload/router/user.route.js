const express = require("express");
const { user } = require("../controllers");
const route = express.Router();
route.get('/user-view-product',
user.viewProducts
)
route.get('/user-view-categorie',
user.viewCategory
)
route.get("/user-view-productById/:id", user.viewProductById);
//categoryName
route.get("/user-view-productByCategorie/:categoryName", user.viewProductByCategory);
route.get(
  "/user-view-productByName/:name",
  user.viewProductByName
);
route.get("/user-view-categorieByName/:name", user.viewCategoryByName);
module.exports = route;