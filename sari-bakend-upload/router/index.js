const auth = require("./auth.route");
const admin = require("./admin.route")
const sales =require("./sales.route")
const user=require('./user.route')
const Routers = {
  auth, admin,sales,user
};
module.exports = Routers;