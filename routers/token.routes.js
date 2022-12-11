const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getTokens,
  getToken,
  addToken,
  updateToken,
  deleteToken,
} = require("../controllers/token");
const router = new Router();

router
  .get("/", getTokens)
  .get("/:id", getToken)
  .post("/", addToken)
  .put("/:id", updateToken)
  .delete("/:id", deleteToken);

module.exports = router.routes();
