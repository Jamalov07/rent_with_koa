const jwt = require("../Services/JwtService");
const config = require("config");

module.exports = async function (ctx, next) {
  if (ctx.method === "OPTIONS") {
    return next();
  }
  try {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      return ctx.error(400, { message: "imkonsizdaaa" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return ctx.error(400, { message: "token yo'q" });
    }
    const decodedData = await jwt.verifyAccess(token, config.get("secret"));
    console.log(decodedData);
    if (!decodedData) {
      return ctx.error(400, { message: "invalid token" });
    }
    
    if (decodedData.id != ctx.params.id) {
      return ctx.error(400, { message: "ilojsiz" });
    }
    return next();
  } catch (error) {
    ctx.error(400, { message: error.message });
  }
};
