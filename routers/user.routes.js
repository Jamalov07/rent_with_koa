const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
  refreshTokenUser,
} = require("../controllers/user");
const userPolice = require("../middlewares/userPolice");
const userEditPolice = require("../middlewares/userEditPolice");
const router = new Router();

router
  .get("/", userPolice, getUsers)
  .get("/logout", logOutUser)
  .get("/refresh", refreshTokenUser)
  .get("/:id", userPolice, getUser)
  .post("/", userPolice, Validator("user"), addUser)
  .put("/:id",userEditPolice, Validator("user"), updateUser)
  .delete("/:id",userEditPolice, deleteUser)
  .post("/login", loginUser);

module.exports = router.routes();
