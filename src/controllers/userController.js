import userServices from "../services/userServices";
let handleLogin = async (req, res) => {
  // Validate thông tin người dùng
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }

  let userData = await userServices.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requỉed",
      users: [],
    });
  }
  let users = await userServices.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userServices.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let response = await userServices.deleteUser(userId);
    if (response.errCode === 0) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  } else {
    console.log("Delele Failed");
    return res.status(500).json({
      errCode: 1,
      message: "Delete user error!",
    });
  }
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let response = await userServices.eidtUser(data);
  if (response.errCode === 1) {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

// allcodes
let getAllCodes = async (req, res) => {
  try {
    let data = await userServices.getAllCodeServices(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("get all code err", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
export {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
  getAllCodes,
};
