const Router = require("@koa/router");
const router = new Router();

const Response = require("../Services/Response");
const lodash = require("lodash");

router.use((ctx, next) => {
  ctx.ok = (status, data, notification = {}) => {
    let showNull = ctx.query.showNull || false;
    removeNullableNestedObject(data, showNull, function (response) {
      let resp = new Response(status, response, null, notification);
      ctx.status = status;
      ctx.body = resp;
    });
  };

  ctx.error = (status, err, data = {}) => {
    if (typeof err == "object") {
      let response = new Response(status, data, err, {});
      response.getError((errorResp) => {
        ctx.status = status;
        ctx.body = errorResp;
        // res.end();
      });
    }
  };
  return next();
});
module.exports = router.routes();

const removeNullableNestedObject = function (params, showNull, callback) {
  try {
    params = pruneEmpty(params, showNull);
  } catch (ex) {
    console.log(ex);
    console.error("Error when remove nullable nested objects", ex);
  }
  callback(params);
};

function pruneEmpty(obj, showNull) {
  return (function prune(current) {
    lodash.forOwn(current, function (value, key) {
      if (
        lodash.isUndefined(value) ||
        lodash.isNull(value) ||
        lodash.isNaN(value) ||
        (lodash.isString(value) && lodash.isEmpty(value)) ||
        (lodash.isObject(value) &&
          lodash.isEmpty(prune(value)) &&
          !lodash.isDate(value))
      ) {
        if (showNull) current[key] = "";
        if (showNull && lodash.isNumber(current[key]))
          return (current[key] = 0);
        if (showNull && lodash.isArray(value)) return (current[key] = []);
        delete current[key];
      }
    });
    if (lodash.isArray(current)) lodash.pull(current, undefined);

    return current;
  })(lodash.cloneDeep(obj));
}
