const Router = require("@koa/router");
const Validator = require("../middlewares/validator");

const {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getPayments)
  .get("/:id",userPolice, getPayment)
  .post("/",userPolice,Validator("payment"), addPayment)
  .put("/:id",userPolice,Validator("payment"), updatePayment)
  .delete("/:id",userPolice, deletePayment);

module.exports = router.routes();
