const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getPenaltys,
  getPenalty,
  addPenalty,
  updatePenalty,
  deletePenalty,
} = require("../controllers/penalty");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getPenaltys)
  .get("/:id",userPolice, getPenalty)
  .post("/",userPolice, Validator("penalty"), addPenalty)
  .put("/:id",userPolice, Validator("penalty"), updatePenalty)
  .delete("/:id",userPolice, deletePenalty);

module.exports = router.routes();
