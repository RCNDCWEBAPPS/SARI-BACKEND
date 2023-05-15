const { result, parseInt, forEach, sumBy } = require("lodash");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
let generator = require("generate-password");
const db = require("../models");
const { ranchManager, inspector } = require("../controllers");
const {
  errorHandler,
  notifyUser,
  sendData,
  omitNullValues,
  omitNullValuesObj,
} = require("../_helper");
exports.addCategory = async (req, res) => {
  try {
    const { name, description } =
      req.body;
    // console.log("req.body: ", req.body);
    await db.category
      .create({
  name,
description
      })
      .then((result) => {
        let { dataValues } = result;
     
        sendData({ category: omitNullValuesObj(dataValues) }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      })
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
exports.updateCategorie = async (req, res) => {
 
  try {
    let { id } = req.params;
    await db.category
      .findOne({
        where: {
          id,
        },
      })
      .then((category) => {
        return category.update(req.body);
      })
      .then((category) => {
        sendData({ categorie: category }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    let { id } = req.params;
    await db.category
      .findOne({
        where: {
          id,
        },
      })
      .then((categorie) => {
        if (categorie !== null) {
          categorie.destroy();
          notifyUser("categrie deleted successfully!", res);
        } else {
          errorHandler("user is not found!", res);
        }
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};