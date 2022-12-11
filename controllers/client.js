const { Client } = require("../models/models");
const { encode, decode } = require("../Services/crypt");
const uuid = require("uuid");
const otpGenerator = require("otp-generator");
const { OTP } = require("../models/models");
const ApiError = require("../errors/ApiError");

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

const getClients = async (ctx) => {
  try {
    const allClients = await Client.findAll();
    ctx.ok(200, allClients);
  } catch (error) {
    ctx.body = error.errors[0].message;
  }
};

const getClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client) {
      ctx.error(400, { friendlyMsg: "client not found" });
    }
    ctx.ok(200, client);
  } catch (error) {
    ctx.body = error.errors[0].message;
  }
};

const addClient = async (ctx) => {
  try {
    const client = await Client.create(ctx.request.body);

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
      check: client.contact_number,
      success: true,
      message: "otp sent to user",
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    ctx.status = 200;
    ctx.body = { Status: "Success", Details: encoded };
  } catch (error) {
    ctx.body = error;
  }
};

const updateClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client) {
      ctx.error(400, { friendlyMsg: "client not found" });
    }
    await Client.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.ok(200, { message: "Client updated" });
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client) {
      ctx.error(400, { friendlyMsg: "client not found" });
    }
    await Client.destroy({ where: { id: ctx.params.id } });
    ctx.ok(200, { message: "Client deleted" });
  } catch (error) {
    ctx.body = error.errors[0].message;
  }
};

module.exports = {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
};
