const { AdsManagement } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getAdsManagements = async (ctx) => {
  try {
    const allAdsManagements = await AdsManagement.findAll();
    ctx.ok(200, allAdsManagements);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getAdsManagement = async (ctx) => {
  try {
    const adsmanagement = await AdsManagement.findByPk(ctx.params.id);
    if (!adsmanagement) {
      ctx.error(400, { friendlyMsg: "adsm not found" });
    }
    ctx.ok(200, adsmanagement);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addAdsManagement = async (ctx) => {
  try {
    await AdsManagement.create(ctx.request.body);
    ctx.ok(201, { message: "adsmanagement added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateAdsManagement = async (ctx) => {
  try {
    const adsmanagement = await AdsManagement.findByPk(ctx.params.id);
    if (!adsmanagement) {
      ctx.error(400, { friendlyMsg: "adsmanagement not found" });
    }
    await AdsManagement.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { message: "adsmanagement updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteAdsManagement = async (ctx) => {
  try {
    const adsmanagement = await AdsManagement.findByPk(ctx.params.id);
    if (!adsmanagement) {
      ctx.error(400, { friendlyMsg: "id invalid or not found" });
    }
    await AdsManagement.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { message: "adsmanagement deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getAdsManagements,
  getAdsManagement,
  addAdsManagement,
  updateAdsManagement,
  deleteAdsManagement,
};
