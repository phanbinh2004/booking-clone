import db from "../models/index";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  return res.send(message);
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDServices.getUserInfoById(userId);
    // check user
    // if (!userData) {
    //   return res.send("not found user");
    // }
    return res.render("editCrud.ejs", {
      userInfo: userData,
    });
  } else {
    return res.send("User not found!");
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDServices.updateUser(data);
  if (allUsers) {
    return res.render("displayCRUD.ejs", {
      dataTable: allUsers,
    });
  } else {
    return res.send("Update failed");
  }
};
let deleteCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDServices.deleteUser(userId);
    return res.send("Delete success!");
  } else {
    return res.send("Delete error");
  }
};
export {
  getAboutPage,
  getCRUD,
  getHomePage,
  postCRUD,
  displayGetCRUD,
  getEditCrud,
  putCrud,
  deleteCrud,
};
