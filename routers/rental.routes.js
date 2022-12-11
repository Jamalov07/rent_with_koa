const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getRentals,
  getRental,
  addRental,
  updateRental,
  deleteRental,
} = require("../controllers/rental");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getRentals)
  .get("/:id",userPolice, getRental)
  .post("/",userPolice, Validator("rental"), addRental)
  .put("/:id",userPolice, Validator("rental"), updateRental)
  .delete("/:id",userPolice, deleteRental);

module.exports = router.routes();
