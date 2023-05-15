const express = require("express");
const {
  admin_manageUser,
  admin_manageCategory,
  admin_manageProducts,
} = require("../admin-controller");
const { authAdmin } = require("../_middleware");
const route = express.Router();

/**
 *admin: manage user
 */

route.post(
  "/admin-register-user",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageUser.registerUser
);
route.get("/admin-list-users", admin_manageUser.totalUsers);
route.patch(
  "/admin-update-user/:id",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageUser.updateUser
);
route.delete(
  "/admin-delete-user/:username",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  admin_manageUser.deleteuser
);
route.post(
  "/admin-add-category",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageCategory.addCategory
);
route.post(
  "/admin-add-products",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.addProducts
);
route.get(
  "/admin-list-category",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageCategory.viewCategory
);
route.delete(
  "/admin-delete-categorie/:id",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  admin_manageCategory.deleteCategorie
);
route.patch(
  "/admin-update-categorie/:id",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageCategory.updateCategorie
);
route.get(
  "/admin-list-products",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.viewProducts
);
//updateProduct
route.patch(
  "/admin-update-products/:id",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.updateProduct
);
route.post(
  "/:quantity/admin-removeProduct/:productId",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.addSalesProduct
);
route.post(
  "/:quantity/admin-update-productQuantity/:id",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.updateProductQuantity
);
route.get(
  "/admin-list-saleProducts",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.viewSaleProduct
);
route.get(
  "/admin-list-remaningProducts",
  authAdmin.requireSignin,
  authAdmin.authMiddleware,
  authAdmin.checkAdmin,
  admin_manageProducts.viewRemaningProduct
);

module.exports = route;
