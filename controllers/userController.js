
const { result, parseInt, forEach, sumBy } = require("lodash");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
let generator = require("generate-password");
const db = require("../models");
const { join } = require("path");
const fs = require("fs");

const {
  errorHandler,
  notifyUser,
  sendData,
  omitNullValues,
  omitNullValuesObj,
} = require("../_helper");
exports.viewProducts = async (req, res) => {
  try {
    await db.products
      .findAll({
        include: [{ model: db.ProductImage }],
        order: [["createdAt", "DESC"]],
      })
      .then((products) => {
        products = omitNullValues(products);
        sendData({ products: products }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.viewProductById = async (req, res) => {
  try {
    let { id } = req.params;
    await db.products
      .findOne({
        where:{id},
        include: [{ model: db.ProductImage }],
        order: [["createdAt", "DESC"]],
      })
      .then((product) => {
     
        sendData( {product: product} , res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.viewCategory = async (req,res) => {
  try {
await db.category
           .findAll({
             order: [["createdAt", "DESC"]],
           })
           .then((category) => {
             category = omitNullValues(category);
             sendData({ categorys: category }, res);
           })
           .catch((err) => {
             errorHandler(err, res);
           });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.viewCategoryByName = async (req, res) => {
  try {
    let { name }=req.params
    await db.category
      .findOne({
        where:{name},
        order: [["createdAt", "DESC"]],
      })
      .then((category) => {
        console.log(category)
    return res.status(200).json({ category: category });
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.viewProductByCategory = async (req,res) => {
   try {
     let {categoryName}=req.params
    
     await db.products
       .findAll({
         where: { categoryName },
         include: [{ model: db.ProductImage }],
         order: [["createdAt", "DESC"]],
       })
       .then((products) => {
           products = omitNullValues(products);
           sendData({ products: products }, res);
       })
       .catch((err) => {
         errorHandler(err, res);
       });
   } catch (err) {
     errorHandler(err, res);
   }
};
exports.viewProductByName = async (req,res) => {
   try {
     let {name}=req.params
    
     await db.products
       .findAll({
         where: { name },
         include: [{ model: db.ProductImage }],
         order: [["createdAt", "DESC"]],
       })
       .then((products) => {
           products = omitNullValues(products);
           sendData({ products: products }, res);
       })
       .catch((err) => {
         errorHandler(err, res);
       });
   } catch (err) {
     errorHandler(err, res);
   }
};