const { BikeInfo } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getBikeInfos = async (ctx) => {
  try {
    const allBikeInfos = await BikeInfo.findAll();
    ctx.ok(200, allBikeInfos);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getBikeInfo = async (ctx) => {
  try {
    const bikeinfo = await BikeInfo.findByPk(ctx.params.id);
    if (!bikeinfo) {
      ctx.error(400, { friendlyMsg: "bikeinfo not found" });
    }
    ctx.ok(200, bikeinfo);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addBikeInfo = async (ctx) => {
  try {
    await BikeInfo.create(ctx.request.body);
    ctx.ok(200, { message: "BikeInfo added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateBikeInfo = async (ctx) => {
  try {
    const bikeinfo = await BikeInfo.findByPk(ctx.params.id);
    if (!bikeinfo) {
      ctx.error(400, { friendlyMsg: "bikeinfo not found" });
    }
    await BikeInfo.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { message: "BikeInfo updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteBikeInfo = async (ctx) => {
  try {
    const bikeinfo = await BikeInfo.findByPk(ctx.params.id);
    if (!bikeinfo) {
      ctx.error(400, { friendlyMsg: "bikeinfo not found" });
    }
    await BikeInfo.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { message: "BikeInfo deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getBikeInfos,
  getBikeInfo,
  addBikeInfo,
  updateBikeInfo,
  deleteBikeInfo,
};
