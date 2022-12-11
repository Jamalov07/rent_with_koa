const Router = require("@koa/router");
const Validator = require("../middlewares/validator");
const {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
} = require("../controllers/client");
const clientPolice = require("../middlewares/clientPolice");
const userPolice = require("../middlewares/userPolice");
const router = new Router();

router
  .get("/",userPolice, getClients)
  .get("/:id",userPolice, getClient)
  .post("/",clientPolice,Validator("client"), addClient)
  .put("/:id",clientPolice,Validator("client"), updateClient)
  .delete("/:id", clientPolice,deleteClient)

module.exports = router.routes();
