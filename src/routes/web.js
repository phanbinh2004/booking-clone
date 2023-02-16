import express from "express";
import {
  getAboutPage,
  getCRUD,
  getHomePage,
  postCRUD,
  displayGetCRUD,
  getEditCrud,
  putCrud,
  deleteCrud,
} from "../controllers/homeController";
import {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
  getAllCodes,
} from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.post("/put-crud", putCrud);
  router.get("/edit-crud", getEditCrud);
  router.get("/delete-crud", deleteCrud);
  router.post("/api/login", handleLogin);
  // API CRUD
  router.post("/api/create-new-user", handleCreateNewUser);
  router.get("/api/get-all-users", handleGetAllUser);
  router.put("/api/edit-user", handleEditUser);
  router.delete("/api/delete-user", handleDeleteUser);

  // allcodes
  router.get("/api/allcodes", getAllCodes);
  return app.use("/", router);
};

module.exports = initWebRoutes;
