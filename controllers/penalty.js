const { Penalty } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getPenaltys = async (ctx) => {
  try {
    const allPenaltys = await Penalty.findAll();
    ctx.ok(200, allPenaltys);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getPenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty) {
      ctx.error(400, { friendlyMsg: "penalty not found" });
    }
    ctx.ok(200, penalty);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addPenalty = async (ctx) => {
  try {
    await Penalty.create(ctx.request.body);
    ctx.ok(200, { friendlyMsg: "penalty added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updatePenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty) {
      ctx.error(400, { friendlyMsg: "penalty not found" });
    }
    await Penalty.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { friendlyMsg: "Penalty updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deletePenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty) {
      ctx.error(400, { friendlyMsg: "penalty not found" });
    }
    await Penalty.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "penalty deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getPenaltys,
  getPenalty,
  addPenalty,
  updatePenalty,
  deletePenalty,
};
