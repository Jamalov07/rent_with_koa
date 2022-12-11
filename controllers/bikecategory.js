const { BikeCategory } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getBikeCategorys = async (ctx) => {
  try {
    const allBikeCategorys = await BikeCategory.findAll();
    ctx.ok(200, allBikeCategorys);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getBikeCategory = async (ctx) => {
  try {
    const bikecategory = await BikeCategory.findByPk(ctx.params.id);
    if (!bikecategory) {
      ctx.error(400, { friendlyMsg: "bikecategory not found" });
    }
    ctx.ok(200, bikecategory);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addBikeCategory = async (ctx) => {
  try {
    await BikeCategory.create(ctx.request.body);
    ctx.ok(200, { message: "bikecategory added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateBikeCategory = async (ctx) => {
  try {
    const bikecategory = await BikeCategory.findByPk(ctx.params.id);
    if (!bikecategory) {
      ctx.error(400, { friendlyMsg: "bikecategory not found" });
    }
    await BikeCategory.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { message: "bikecategory updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteBikeCategory = async (ctx) => {
  try {
    const bikecategory = await BikeCategory.findByPk(ctx.params.id);
    if (!bikecategory) {
      ctx.error(400, { friendlyMsg: "bikecategory not found" });
    }
    await BikeCategory.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { message: "bikecategory deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getBikeCategorys,
  getBikeCategory,
  addBikeCategory,
  updateBikeCategory,
  deleteBikeCategory,
};
