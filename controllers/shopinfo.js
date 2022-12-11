const { ShopInfo, User } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getShopInfos = async (ctx) => {
  try {
    const allShopInfos = await ShopInfo.findAll();
    ctx.ok(200, allShopInfos);
  } catch (error) {
    console.log(error);
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getShopInfo = async (ctx) => {
  try {
    const shopinfo = await ShopInfo.findByPk(ctx.params.id);
    if (!shopinfo) {
      ctx.error(400, { friendlyMsg: "shopinfo not found" });
    }
    ctx.ok(200, shopinfo);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addShopInfo = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.request.updated_by);
    if (!user) await ShopInfo.create(ctx.request.body);
    ctx.ok(200, { friendlyMsg: "shop info added" });
  } catch (error) {
    ctx.status = 500;
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateShopInfo = async (ctx) => {
  try {
    const shopinfo = await ShopInfo.findByPk(ctx.params.id);
    if (!shopinfo) {
      ctx.error(400, { friendlyMsg: "shopinfo not found" });
    }
    await ShopInfo.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "shop info updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteShopInfo = async (ctx) => {
  try {
    const shopinfo = await ShopInfo.findByPk(ctx.params.id);
    if (!shopinfo) {
      ctx.error(400, { friendlyMsg: "shopinfo not found" });
    }
    await ShopInfo.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "shop info deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getShopInfos,
  getShopInfo,
  addShopInfo,
  updateShopInfo,
  deleteShopInfo,
};
