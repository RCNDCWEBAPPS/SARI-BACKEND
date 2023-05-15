const sales = require("./salesController");
const auth = require("./userAuthentication");
const user=require('./userController')
const controllers = {
 sales,auth,user
};
module.exports = controllers;
