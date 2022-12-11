const Koa = require("koa");
const config = require("config");
const app = new Koa();
const PORT = config.get("port");
const router = require("./routers/index.routes");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const sequelize = require("./config/db");
// const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/errorHandlingMiddleware");
app.use(koaStatic(__dirname + "/public"));
app.use(logger());
app.use(bodyParser());
app.use(cors());
// app.use(cookieParser());
app.use(router);
app.use(errorHandler);



const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully");
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portida ishga tushdi`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
