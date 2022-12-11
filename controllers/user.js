const { User, Token } = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("../Services/JwtService");
const DeviceDetector = require("node-device-detector");
const config = require("config");
const ApiError = require("../errors/ApiError");

const addToken = async (ctx, user, tokens) => {
  const userAgent = ctx.headers["user-agent"];
  const result = detector.detect(userAgent);
  console.log("result parse", result);
  const tokenData = {
    table_name: "user",
    user_id: user.id,
    user_os: JSON.stringify(result.os),
    user_device: JSON.stringify(result.device),
    token: tokens.refreshToken,
  };
  const tokenOldData = await Token.findOne({
    where: tokenData,
  });
  if (!tokenOldData) {
    const token = await Token.create(tokenData);
  }
};

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});

const getUsers = async (ctx) => {
  try {
    const allUsers = await User.findAll();
    ctx.ok(200, allUsers);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.error(400, { friendlyMsg: "user not found" });
    }
    ctx.ok(200, user);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addUser = async (ctx) => {
  try {
    const userHashedPassword = bcrypt.hashSync(ctx.request.body.password, 7);
    ctx.request.body.password = userHashedPassword;
    const user = await User.create(ctx.request.body);
    const payload = {
      id: user.id,
      user_category_id: user.user_category_id,
      user_status: user.status,
    };
    const tokens = jwt.generateTokens(payload);
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    addToken(ctx, user, tokens);

    ctx.ok(201, { friendlyMsg: { tokens, user: payload } });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.error(400, { friendlyMsg: "user not found" });
    }
    await User.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { friendlyMsg: "user updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.error(400, { friendlyMsg: "user not found" });
    }
    await User.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "user deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const loginUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      ctx.error(400, { friendlyMsg: "user royhatdan not otgan" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      ctx.error(400, { friendlyMsg: "user parol notgori" });
    }
    const payload = {
      id: user.id,
      user_category_id: user.user_category_id,
      user_status: user.status,
    };
    const tokens = jwt.generateTokens(payload);
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    addToken(ctx, user, tokens);

    ctx.ok(200, { tokens });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const logOutUser = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    console.log(refreshToken);
    let user;
    if (!refreshToken) {
      ctx.error(400, { friendlyMsg: "token yoq" });
    }
    const decodedData = await jwt.verifyRefresh(refreshToken);
    if (!decodedData) {
      ctx.error(400, { friendlyMsg: "token invalid" });
    }
    user = await User.findOne({
      where: {
        id: decodedData.id,
        user_category_id: decodedData.user_category_id,
        status: decodedData.user_status,
      },
    });
    console.log(user);
    await Token.destroy({ where: { token: refreshToken } });
    ctx.cookies.set("refreshToken", null);
    ctx.ok(200, { friendlyMsg: `Ko'rishguncha ${user.username}` });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const refreshTokenUser = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    if (!refreshToken) {
      return (ctx.body = "token yo'q");
    }
    const decodedData = await jwt.verifyRefresh(refreshToken);
    if (!decodedData) {
      return (ctx.body = "token invalid");
    }
    const userDataDB = await User.findOne({
      where: {
        id: decodedData.id,
        user_category_id: decodedData.user_category_id,
        status: decodedData.user_status,
      },
    });
    const userDataCookie = await jwt.verifyRefresh(refreshToken);
    if (!userDataDB || !userDataCookie) {
      ctx.error(400, { friendlyMsg: "royhatdan otmagan" });
    }
    const user = await User.findByPk(userDataCookie.id);
    if (!user) {
      ctx.error(400, { friendlyMsg: "error" });
    }
    const payload = {
      id: user.id,
      user_category_id: user.user_category_id,
      user_status: user.status,
    };
    const tokens = jwt.generateTokens(payload);
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    ctx.ok(200, { tokens });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
  refreshTokenUser,
};
