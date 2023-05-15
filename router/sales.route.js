const express = require("express");

const { sales } = require("../controllers");
const { auth } = require("../_middleware");
const route = express.Router();

/**
 *admin: manage user
 */
route.post(
  "/sales-add-products",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.addProducts
);
route.get(
  "/sales-list-products",
auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.viewProducts
);
route.patch(
  "/sales-update-product/:id",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateProduct
)
route.post(
  "/:quantity/sales-update-productQuantity/:id",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateProductQuantity
);
route.post(
  "/:quantity/sales-removeProduct/:productId",
  
  sales.addSalesProduct
);
route.post(
  "/sales-add-category",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.addCategory
);
route.get(
  "/sales-list-categorie",
auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.viewCategory
);
route.patch(
  "/sales-update-categorie/:id",
auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateCategorie
);
module.exports = route;
