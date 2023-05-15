const { result, parseInt, forEach, sumBy } = require('lodash')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
let generator = require('generate-password')
const db = require('../models')
const { ranchManager, inspector } = require('../controllers')
const {
  errorHandler,
  notifyUser,
  sendData,
  omitNullValues,
  omitNullValuesObj,
} = require('../_helper')
/**
 *admin: register user
 * @param {*} req
 * @param {*} res
 */

/** registering random users for test use only: below */

/**
 * registering random users, assign ranch managers for test use only: above
 *
 */

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, sex, role, email, phoneNo } = req.body
    // console.log("req.body: ", req.body);
    let pass = generator.generate({
      length: 8,
      numbers: true,
    })
    const username = `${firstName}-${generator.generate({
      length: 2,
      numbers: true,
    })}`
    const password = await bcrypt.hash(pass, 12)

    await db.user
      .create({
        firstName,
        lastName,
        sex,
        role,
        email,
        phoneNo,
        username,
        password,
        pass,
        activate: true,
      })
      .then((result) => {
        let { dataValues } = result
        dataValues.password = undefined
        dataValues.activate = undefined
        sendData({ user: omitNullValuesObj(dataValues) }, res)
      })
      .catch((err) => {
        errorHandler(err, res)
      })
      .catch((err) => {
        errorHandler(err, res)
      })
  } catch (err) {
    errorHandler(err, res)
  }
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
/**
 * admin: list all registered users
 * @param {*} req
 * @param {*} res
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */
/**
 * admin: delete a user
 * @param {*} req
 * @param {*} res
 */

exports.deleteuser = async (req, res) => {
  try {
    let { username } = req.params
    await db.user
      .findOne({
        where: {
          username,
        },
      })
      .then((user) => {
        if (user !== null) {
          user.destroy()
          notifyUser('user deleted successfully!', res)
        } else {
          errorHandler('user is not found!', res)
        }
      })
      .catch((err) => {
        errorHandler(err, res)
      })
  } catch (err) {
    errorHandler(err, res)
  }
}

/**
 * admin: update user
 * @param {*} req
 * @param {*} res
 */
exports.updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      sex,
      role,
      email,
      check,
      phoneNo,
      username,
    } = req.body
    // console.log("req.body: ", req.body);
    let pass = generator.generate({
      length: 8,
      numbers: true,
    })
    const password = await bcrypt.hash(pass, 12)
    let { id } = req.params
    await db.user
      .findOne({
        where: {
          id,
        },
      })
      .then((user) => {
        if(check){
             return user.update({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
          pass: pass,
        })
        }
        else{
             return user.update({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
        })
        }
      })
      .then((updatedUser) => {
        sendData({ user: updatedUser }, res)
      })
      .catch((err) => {
        errorHandler(err, res)
      })
  } catch (err) {
    errorHandler(err, res)
  }
}
/**
 * admin assign ranch manager
 * @param {*} req
 * @param {*} res
 */
/**
 *
 * @param {*} res
 * @param {*} req
 */
exports.totalUsers = async (req, res) => {
  try {
    await db.user
      .findAll({
        attributes: { exclude: ['password', 'code', 'activate'] },
        order: [['createdAt', 'DESC']],
      })
      .then((users) => {
        users = omitNullValues(users)
        sendData({ users: users }, res)
      })
      .catch((err) => {
        errorHandler(err, res)
      })
  } catch (err) {
    errorHandler(err, res)
  }
}
/**
 *
 * @param {*} res
 * @param {*} req
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */
