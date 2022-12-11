const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getShopInfos,
  getShopInfo,
  addShopInfo,
  updateShopInfo,
  deleteShopInfo,
} = require("../controllers/shopinfo");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getShopInfos)
  .get("/:id",userPolice, getShopInfo)
  .post("/",userPolice,Validator("shopinfo"), addShopInfo)
  .put("/:id",userPolice,Validator("shopinfo"), updateShopInfo)
  .delete("/:id",userPolice, deleteShopInfo);

module.exports = router.routes();
