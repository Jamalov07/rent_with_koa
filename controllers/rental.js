const { Rental } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getRentals = async (ctx) => {
  try {
    const allRentals = await Rental.findAll();
    ctx.ok(200, allRentals);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental) {
      ctx.error(400, { friendlyMsg: "rental not found" });
    }
    ctx.ok(200, rental);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addRental = async (ctx) => {
  try {
    await Rental.create(ctx.request.body);
    ctx.ok(200, { friendlyMsg: "rental added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental) {
      ctx.error(400, { friendlyMsg: "rental not found" });
    }
    await Rental.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { friendlyMsg: "rental updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental) {
      ctx.error(400, { friendlyMsg: "rental not found" });
    }
    await Rental.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "rental deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getRentals,
  getRental,
  addRental,
  updateRental,
  deleteRental,
};
