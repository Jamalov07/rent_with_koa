const Router = require("@koa/router");
const {
 verifyOTP,
  newOTP,deleteOTP
} = require("../controllers/otp");
const router = new Router();

router
  .post("/verify", verifyOTP)
  .post("/new", newOTP)
  // .put("/:id", updateOTP)
  .delete("/quit", deleteOTP);

module.exports = router.routes();
