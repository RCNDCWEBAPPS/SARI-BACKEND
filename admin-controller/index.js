const adminAuth = require("./adimnAuth");
const admin_manageUser = require("./admin-user.controller");
const admin_manageCategory=require("./admin-category.controller")
const admin_manageProducts=require("./admin-products-controller")
const controllers = {
  adminAuth,
  admin_manageUser,
  admin_manageCategory,
  admin_manageProducts
};
module.exports = controllers;
