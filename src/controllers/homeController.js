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
  console.log(message);
  console.log(req.body);
  return res.send("post crud");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  console.log("......................");
  console.log(data);
  console.log(".......................");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
export { getAboutPage, getCRUD, getHomePage, postCRUD, displayGetCRUD };
