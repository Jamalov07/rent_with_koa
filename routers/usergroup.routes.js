const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getUserGroups,
  getUserGroup,
  addUserGroup,
  updateUserGroup,
  deleteUserGroup,
} = require("../controllers/usergroup");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getUserGroups)
  .get("/:id",userPolice, getUserGroup)
  .post("/",userPolice,Validator("usergroup"), addUserGroup)
  .put("/:id",userPolice,Validator("usergroup"), updateUserGroup)
  .delete("/:id",userPolice, deleteUserGroup);

module.exports = router.routes();
