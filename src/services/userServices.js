import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // kiểm tra email có tồn tại không
      let isExist = await checkUserEmail(email);
      let userData = {};
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleid", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.errMessage = "login success";
            delete user.password;
            userData.user = user;
            console.log("userData", userData);
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User isn't not found`;
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist in your system . Plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          message: "Your email is exsit, Plz try other email",
        });
      } else {
        let hashPasswordFromBcrypt = await hasUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let hasUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "User is't exist",
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let eidtUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data user", data);
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Invalid requỉed parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          await user.save();
        // let allUsers = await db.User.findAll();
        // resolve(allUsers);
        resolve({
          errCode: 0,
          message: "Update success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User is't exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//
let getAllCodeServices = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      if (type) {
        let allcode = await db.Allcode.findAll({
          where: {
            type: type,
          },
        });
        res.errCode = 0;
        res.data = allcode;
      } else {
        (res.errCode = 1), (res.message = "Missing requried paramater !!!");
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  eidtUser: eidtUser,
  getAllCodeServices,
};
