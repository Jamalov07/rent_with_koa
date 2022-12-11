const Validator = require("../middlewares/validator");
const Router = require("@koa/router");
const {
  getBikeInfos,
  getBikeInfo,
  addBikeInfo,
  updateBikeInfo,
  deleteBikeInfo,
} = require("../controllers/bikeinfo");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getBikeInfos)
  .get("/:id",userPolice, getBikeInfo)
  .post("/",userPolice,Validator("bikeinfo"), addBikeInfo)
  .put("/:id",userPolice,Validator("bikeinfo"), updateBikeInfo)
  .delete("/:id", deleteBikeInfo);

module.exports = router.routes();
