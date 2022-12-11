const Validators = require("../validations/validators");

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator)) {
    console.log(validator);
    throw new Error(`'${validator}' validator is not exists`);
  }
  return async function (ctx, next) {
    try {
      const validated = await Validators[validator].validateAsync(
        ctx.request.body
      );
      ctx.request.body = validated;
      return next();
    } catch (error) {
      if (error.isJoi) {
        ctx.status = 500;
        return (ctx.body = error.message);
      }
      ctx.status = 500;
      return (ctx.body = error.message);
    }
  };
};
