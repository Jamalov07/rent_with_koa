const { UserGroup } = require("../models/models");
const ApiError = require("../errors/ApiError");

const getUserGroups = async (ctx) => {
  try {
    const allUserGroups = await UserGroup.findAll();
    ctx.ok(200, allUserGroups);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getUserGroup = async (ctx) => {
  try {
    const usergroup = await UserGroup.findByPk(ctx.params.id);
    if (!usergroup) {
      ctx.error(400, { friendlyMsg: "UserGroup not found" });
    }
    ctx.ok(200, usergroup);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addUserGroup = async (ctx) => {
  try {
    await UserGroup.create(ctx.request.body);
    ctx.ok(201, { friendlyMsg: "usergroup added" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateUserGroup = async (ctx) => {
  try {
    const usergroup = await UserGroup.findByPk(ctx.params.id);
    if (!usergroup) {
      ctx.error(400, { friendlyMsg: "UserGroup not found" });
    }
    await UserGroup.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { friendlyMsg: "usergroup updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteUserGroup = async (ctx) => {
  try {
    const usergroup = await UserGroup.findByPk(ctx.params.id);
    if (!usergroup) {
      ctx.error(400, { friendlyMsg: "UserGroup not found" });
    }
    await UserGroup.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { friendlyMsg: "usergroup deleted" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getUserGroups,
  getUserGroup,
  addUserGroup,
  updateUserGroup,
  deleteUserGroup,
};
