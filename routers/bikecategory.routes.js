const Validator = require("../middlewares/validator");
const Router = require("@koa/router");
const {
  getBikeCategorys,
  getBikeCategory,
  addBikeCategory,
  updateBikeCategory,
  deleteBikeCategory,
} = require("../controllers/bikecategory");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getBikeCategorys)
  .get("/:id",userPolice, getBikeCategory)
  .post("/",userPolice, Validator("bikecategory"), addBikeCategory)
  .put("/:id",userPolice, Validator("bikecategory"), updateBikeCategory)
  .delete("/:id",userPolice, deleteBikeCategory);

module.exports = router.routes();
