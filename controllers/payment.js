const { Payment } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getPayments = async (ctx) => {
  try {
    const allPayments = await Payment.findAll();
    return ctx.ok(200, allPayments);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getPayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    if (!payment) {
      ctx.error(400, { friendlyMsg: "payment not found" });
    }
    return ctx.ok(200, payment);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addPayment = async (ctx) => {
  try {
    await Payment.create(ctx.request.body);
    ctx.ok(200, { friendlyMsg: "Payment added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updatePayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    if (!payment) {
      ctx.error(400, { friendlyMsg: "payment not found" });
    }
    await Payment.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { friendlyMsg: "Payment updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deletePayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    if (!payment) {
      ctx.error(400, { friendlyMsg: "payment not found" });
    }
    await Payment.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "Payment deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
};
