const Router = require("@koa/router");
const router = new Router();

const shopInfoRouter = require("./shopinfo.routes");
const adsManagmentRouter = require("./adsmanagement.routes");
const userRouter = require("./user.routes");
const OTPRouter = require("./otp.routes");
const clientRouter = require("./client.routes");
const responseRouter = require("./responses.routes");
const bikecategoryRouter = require("./bikecategory.routes");
const bikeinfoRouter = require("./bikeinfo.routes");
const paymentRouter = require("./payment.routes");
const penaltyRouter = require("./penalty.routes");
const rentalRouter = require("./rental.routes");
const userGroupRouter = require("./adsmanagement.routes");

router.use(responseRouter);
router.use("/usergroup", userGroupRouter);
router.use("/rental", rentalRouter);
router.use("/penalty", penaltyRouter);
router.use("/payment", paymentRouter);
router.use("/bikeinfo", bikeinfoRouter);
router.use("/bikecategory", bikecategoryRouter);
router.use("/shopinfo", shopInfoRouter);
router.use("/adsmanagement", adsManagmentRouter);
router.use("/user", userRouter);
router.use("/otp", OTPRouter);
router.use("/client", clientRouter);

module.exports = router.routes();
