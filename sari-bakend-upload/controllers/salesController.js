const { result, parseInt, forEach, sumBy } = require("lodash");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
let generator = require("generate-password");
const db = require("../models");
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
exports.addProducts = async (req, res) => {
  console.log(req.body)
  try {
      let image = true;

    await uploadImage(req, res);
    let productImage;
    if (req.file == undefined) {
      image = false;
    }
    const { name,frameMaterieal,categoryName, size,price,quantity,modelNo} =
      req.body;
    // console.log("req.body: ", req.body);
        let imageURI = undefined;
    if (image) imageURI = `${process.env.URL}/images/${req.file.filename}`;
    console.log(imageURI)
    await db.products
      .create({
name,
frameMaterieal,
categoryName,
size,
price,
quantity,
modelNo
      })
      .then(async(result) => {
if(result){
  await db.ProductImage.create({
    imageURI:imageURI,
    productId:result.id
  }).then((data)=>{
    let {detaValues}=data
        ProductImage=detaValues
  })
}
        let { dataValues } = result;
        sendData({ products: omitNullValuesObj(dataValues)}, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      })
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.updateProduct = async (req, res) => {

     try {
            let image = true;

            await uploadImage(req, res);
            if (req.file == undefined) {
              image = false;
            }
            let imageURI = undefined;
            if (image)
              imageURI = `${process.env.URL}/images/${req.file.filename}`;
                   
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
             productId:id
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
exports.viewProducts = async (req,res) => {
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
  try {
    let { id } = req.params;
    let{quantity}=req.params;
console.log(id)
console.log(quantity)
   await db.products
      .findOne({
        where: {
          id,
        },
      })
      .then((product) => {
        return product.update({quantity:quantity});
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
exports.addSalesProduct = async (req, res) => {
  let  description = req.body.description;
  try {
    let { productId } = req.params;
    let { quantity } = req.params;
    await db.salesproduct
      .create({
        quantity,
        productId:productId,
        comment:description
      })
      .then(async (result) => {
        console.log(result);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};