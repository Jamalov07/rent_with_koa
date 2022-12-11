const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getAdsManagements,
  getAdsManagement,
  addAdsManagement,
  updateAdsManagement,
  deleteAdsManagement,
} = require("../controllers/adsmanagement");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getAdsManagements)
  .get("/:id",userPolice, getAdsManagement)
  .post("/",userPolice, Validator("adsmanagement"), addAdsManagement)
  .put("/:id",userPolice, Validator("adsmanagement"), updateAdsManagement)
  .delete("/:id",userPolice, deleteAdsManagement);

module.exports = router.routes();
