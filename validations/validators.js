const Joi = require("joi");

const rental = Joi.object({
  bike_id: Joi.number().required(),
  client_id: Joi.number().required(),
  rental_start_date: Joi.date().required(),
  rental_end_time: Joi.date(),
  payment_status: Joi.boolean().default(false),
  rental_status: Joi.boolean().default(false),
  remarks: Joi.string().min(3).max(100).required(),
  user_id: Joi.number().required(),
});

const user = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  avatar: Joi.string().min(3).max(50).required(),
  fullname: Joi.string().min(3).max(60).required(),
  contact: Joi.string().max(15).required(),
  email: Joi.string().required(),
  user_category_id: Joi.number().required(),
  status: Joi.boolean().default(false),
});

const shopinfo = Joi.object({
  shop_name: Joi.string().min(3).max(50).required(),
  owner_name: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).required(),
  email_address: Joi.string().required(),
  contact_no: Joi.string().max(20).required(),
  website: Joi.string().max(50).required(),
  updated_by: Joi.number().required(),
});

const adsmanagement = Joi.object({
  ad_name: Joi.string().max(30).required(),
  shop_id: Joi.number().required(),
  banner_image: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  start_date: Joi.date().required(),
  end_time: Joi.date().required(),
  ad_location: Joi.boolean().default(false),
  amount: Joi.number().required(),
  user_id: Joi.number().required(),
});

const usergroup = Joi.object({
  group_name: Joi.string().max(40).required(),
  description: Joi.string().max(100),
  allow_add: Joi.boolean().default(false),
  allow_edit: Joi.boolean().default(false),
  allow_delete: Joi.boolean().default(false),
  allow_print: Joi.boolean().default(false),
  allow_import: Joi.boolean().default(false),
  allow_export: Joi.boolean().default(false),
});

const bikecategory = Joi.object({
  category_name: Joi.string().max(30).required(),
  description: Joi.string().max(40),
});

const bikeinfo = Joi.object({
  bike_category_id: Joi.number().required(),
  shop_id: Joi.number().required(),
  bike_name: Joi.string().max(30).required(),
  specs: Joi.string().max(100).required(),
  rent_price: Joi.number().required(),
  availability: Joi.boolean().default(false),
  user_id: Joi.number().required(),
});

const client = Joi.object({
  client_code: Joi.string().max(15).required(),
  avatar: Joi.string().max(40),
  client_name: Joi.string().max(40).required(),
  email_address: Joi.string().max(30).required(),
  contact_number: Joi.string().max(17).required(),
  complete_address: Joi.string().max(100).required(),
  username: Joi.string().max(50).required(),
  password: Joi.string().max(100).required(),
  status: Joi.boolean().default(false),
});

const payment = Joi.object({
  rental_id: Joi.number().required(),
  payment_type: Joi.number().required(),
  paid_by: Joi.string().max(30).required(),
  payment_date: Joi.date().default(new Date()),
  remarks: Joi.string().max(100).required(),
  user_id: Joi.number().required(),
});

const penalty = Joi.object({
  rental_id: Joi.number().required(),
  penalty_amount: Joi.number().required(),
  payment_status: Joi.boolean().default(false),
  remarks: Joi.string().max(100).required(),
  paid_by: Joi.string().max(30).required(),
  user_id: Joi.number().required(),
});



module.exports = {
  rental,
  user,
  shopinfo,
  adsmanagement,
  usergroup,
  bikecategory,
  bikeinfo,
  client,
  payment,
  penalty,
};

