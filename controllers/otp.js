const { encode, decode } = require("../Services/crypt");
const uuid = require("uuid");
const otpGenerator = require("otp-generator");
const { Client, OTP, Token } = require("../models/models");
const ApiError = require("../errors/ApiError");
const jwt = require("../Services/JwtService");
const config = require("config");
const DeviceDetector = require("node-device-detector");


function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});


const addToken = async (ctx, client, tokens) => {
  const userAgent = ctx.headers["user-agent"];
  const result = detector.detect(userAgent);
  console.log("result parse", result);
  const tokenData = {
    table_name: "client",
    user_id: client.id,
    user_os: JSON.stringify(result.os),
    user_device: JSON.stringify(result.device),
    token: tokens.refreshToken,
  };
  const tokenOldData = await Token.findOne({
    where: tokenData,
  });
  if (!tokenOldData) {
    const token = await Token.create(tokenData);
  }
};

const newOTP = async (ctx) => {
  try {
    const { phone_number } = ctx.request.body;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const data = {
      otp: otp,
      expiration_time: AddMinutesToDate(now, 5),
      id: uuid.v4(),
      verified: false,
    };
    console.log(data);
    const newOtp = await OTP.create(data);

    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: "otp sent to client",
      otp_id: newOtp.id,
    };
    const client = await Client.create({ contact_number: phone_number });
    console.log(client);
    const encoded = await encode(JSON.stringify(details));
    ctx.ok(200, { Status: "Success", Details: encoded });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const verifyOTP = async (ctx) => {
  try {
    const { verification_key, otp, check } = ctx.request.body;
    const currentdate = new Date();
    let decoded;
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return ctx.ok(400, { friedlyMsg: response });
    }

    const obj = JSON.parse(decoded);
    console.log(decoded, "aaa");
    const check_obj = obj.check;

    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not send to  this particular phone number",
      };
      return ctx.error(400, { friendlyMsg: response });
    }
    let params = {
      id: obj.otp_id,
    };

    const result = await OTP.findByPk(params.id);
    console.log(result);
    if (result != null) {
      //check if otp is already used or not
      if (result.verified != true) {
        //check if otp is expired or not
        if (dates.compare(result.expiration_time, currentdate) == 1) {
          //check if otp is equal to the otp in the db
          if (otp === result.otp) {
            let params_verified = {
              id: result.id,
              verified: true,
            };
            await OTP.update(
              { verified: params_verified.verified },
              { where: { id: params_verified.id } }
            );
            const clientResult = await Client.findOne({
              where: { contact_number: check },
            });
            if (!clientResult) {
              
              const response = {
                Status: "Success",
                Details: "new",
                Check: check,
              };

              return ctx.ok(200, response);
            } else {
              await Client.update(
                { otp_id: result.id },
                { where: { contact_number: check } }
              );
              const response = {
                status: "Success",
                Detailts: "old",
                Check: check,
                ClientName: clientResult.client_name,
              };
              const payload = {
                id: clientResult.id,
                client_phone_number: clientResult.contact_number,
              };
              const tokens = jwt.generateTokens(payload);
              ctx.cookies.set("refreshToken", tokens.refreshToken, {
                maxAge: config.get("refresh_ms"),
                httpOnly: true,
              });
              addToken(ctx, clientResult, tokens);
              return ctx.ok(200, { response, tokens, user:payload });
            }
          } else {
            const response = { Status: "Failure", Details: "OTP NOT matched" };
            ctx.error(400, { friendlyMsg: response });
          }
        } else {
          const response = { Status: "Failure", Details: "otp expired" };
          ctx.error(400, { friendlyMsg: response });
        }
      } else {
        const response = { Status: "Failure", Details: "otp already used" };
        ctx.error(400, { friendlyMsg: response });
      }
    } else {
      const response = { Status: "Failure", Details: "bad request" };
      ctx.error(400, { friendlyMsg: response });
    }
  } catch (error) {
    ApiError.internal(ctx, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteOTP = async (ctx) => {
  try {
    const { verification_key, check } = ctx.request.body;
    let decoded;
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      ctx.error(400, { friendlyMsg: response });
    }

    var obj = JSON.parse(decoded);

    const check_obj = obj.check;

    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this particular  phone number",
      };
      ctx.error(400, { friendlyMsg: response });
    }

    let params = {
      id: obj.otp_id,
    };
    const otp = await OTP.destroy({ where: { id: params.id } });
    if (!otp) {
      ctx.error(400, { friendlyMsg: "invalid otp" });
    }
    
    await Client.update({ otp_id: null }, { where: { contact_number: check } });
    return ctx.ok(200, params);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  newOTP,
  verifyOTP,
  deleteOTP,
};
