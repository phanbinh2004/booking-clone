import userServices from "../services/userServices";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let userData = await userServices.handleUserLogin(email, password);
  // console.log(userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.body.id;
  let users = await userServices.getAllUsers();
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
export { handleLogin, handleGetAllUser };
