require("dotenv").config();
const db = require("./models");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const http = require("http");
const morgan = require("morgan");
const express = require("express");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routers = require("./router");
const app = express();
const issue2options = {
  origin: "*",
  allowedHeaders:
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length,token",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  credentials: true,
};

//app.use(express.urlencoded({ extended: true }))
//.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ ...issue2options }));
app.use(express.static("uploads"));
app.use("/api", routers.auth);
app.use("/api", routers.admin);
app.use("/api", routers.sales);
app.use("/api", routers.user);
const startServer = async () => {
  try {
    // db.sequelize.sync({ force: true }).then(() => {
    // db.sequelize.sync({ alter: true }).then(() => {
    db.sequelize.sync({force: false}).then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`app is running on ${process.env.URL}`);
      });
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
startServer();
