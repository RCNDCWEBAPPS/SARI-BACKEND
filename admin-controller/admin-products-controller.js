const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
let generator = require("generate-password");
const db = require("../models");
const _ = require("lodash");
const { join } = require("path");
const fs = require("fs");
const uploadImage = require("../router/upload.helper");
const {
  errorHandler,
  notifyUser,
  sendData,
  omitNullValues,
  omitNullValuesObj,
} = require("../_helper");
//admin add product
exports.addProducts = async (req, res) => {
  console.log(req.body);
  try {
    let image = true;

    await uploadImage(req, res);//upload image 
    let productImage;
    if (req.file == undefined) {
      image = false;
    }
    const {
      name,
      frameMaterieal,
      categoryName,
      size,
      price,
      quantity,
      modelNo,
      color,
    } = req.body;
    // console.log("req.body: ", req.body);
    let imageURI = undefined;
    if (image) imageURI = `${process.env.URL}/images/${req.file.filename}`;
    console.log(imageURI);
    await db.products
      .create({
        name,
        frameMaterieal,
        categoryName,
        size,
        price,
        quantity,
        modelNo,
        color,
      })
      .then(async (result) => {
        if (result) {
          await db.ProductImage.create({
            imageURI: imageURI,
            productId: result.id,
          }).then((data) => {
            let { detaValues } = data;
            productImage = detaValues;
            console.log(productImage);
          });
        }
        let { dataValues } = result;
        sendData(
          {
            products: omitNullValuesObj(dataValues),
            ProductImage: productImage,
          },
          res
        );
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
//admin delet product
exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    await db.products
      .findOne({
        where: {
          id,
        },
        include: [{ model: db.ProductImage }],
      })
      .then(async (product) => {
        if (product !== null) {
          await db.ProductImage.findOne({
            where: { productId: id },
          }).then((pro) => {
            console.log(pro);
            const { dataValues } = pro;
            if (dataValues.imageURI) {
              let filePath = join(
                __dirname,
                `../uploads/images${dataValues.imageURI.split("images")[1]}`
              );
              fs.unlink(filePath, async (err) => {
                if (err) errorHandler(err, res);
                else {
                  console.log("succsessss");
                }
                return;
              });
            }
          });
          product.destroy();
          notifyUser("product deleted successfully!", res);
        } else {
          errorHandler("product is not found!", res);
        }
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};//admin update product
exports.updateProduct = async (req, res) => {
  try {
    let image = true;

    await uploadImage(req, res);
    if (req.file == undefined) {
      image = false;
    }
    let imageURI = undefined;
    if (image) imageURI = `${process.env.URL}/images/${req.file.filename}`;

    const {
      name,
      frameMaterieal,
      categoryName,
      size,
      price,
      quantity,
      modelNo,
    } = req.body;

    let { id } = req.params;
    await db.products
      .findOne({
        where: {
          id,
        },
      })
      .then(async (product) => {
        if (product) {
          await db.ProductImage.findOne({
            where: {
              productId: id,
            },
          }).then((data) => {
            if (image) return data.update({ imageURI: imageURI });
          });
        }
        return product.update({
          name: name,
          frameMaterieal: frameMaterieal,
          categoryName: categoryName,
          size: size,
          price: price,
          quantity: quantity,
          modelNo: modelNo,
        });
      })
      .then((product) => {
        sendData({ product: product }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
//viewP
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
exports.updateProductQuantity = async (req, res) => {
  console.log("jhvjbbfjv", req.body);
  try {
    let { id } = req.params;
    let { quantity } = req.params;
    console.log(id);
    console.log(quantity);
    await db.products
      .findOne({
        where: {
          id,
        },
      })
      .then((product) => {
        return product.update({ quantity: quantity });
      })
      .then((updatedProduct) => {
        sendData({ product: updatedProduct }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.addSalesProduct = async (req, res) => {
  try {
    let { productId } = req.params;
    let { quantity } = req.params;
    await db.salesproduct
      .create({
        quantity,
        productId,
      })
      .then(async (result) => {})
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.viewSaleProduct = async (req, res) => {
  // model: db.ProductImage
  try {
    await db.salesproduct
      .findAll({
        include: [
          { model: db.products, include: [{ model: db.ProductImage }] },
        ],
        order: [["createdAt", "DESC"]],
      })
      .then((products) => {
        console.log("x",products)
        products = omitNullValues(products);
        console.log(products);
        let quantityTotal = JSON.parse(
          _.sumBy(products, (q) => {
            return q.quantity;
          })
        );
        (output = []), (sNumber = quantityTotal.toString());

        for (var i = 0, len = sNumber.length; i < len; i += 1) {
          output.push(+sNumber.charAt(i));
        }
        for (var i = 0, sum = 0; i < output.length; sum += output[i++]);
        console.log(sum);
        console.log("the product sales is ", output);
        sendData({ product: quantityTotal, products: products }, res);
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.viewRemaningProduct = async (req, res) => {
  try {
    await db.products
      .findAll({
        include: [{ model: db.ProductImage }],
        order: [["createdAt", "DESC"]],
      })
      .then((products) => {
        products = omitNullValues(products);
        console.log(products);
        let quantityTotal = JSON.parse(
          _.sumBy(products, (q) => {
            return q.quantity;
          })
        );
        (output = []), (sNumber = quantityTotal.toString());

        for (var i = 0, len = sNumber.length; i < len; i += 1) {
          output.push(+sNumber.charAt(i));
        }
        for (var i = 0, sum = 0; i < output.length; sum += output[i++]);
        sendData({ product: quantityTotal, products: products }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
