const sequelize = require("../config/db");
const { DataTypes, UUID, UUIDV4 } = require("sequelize");

const ShopInfo = sequelize.define(
  "shopinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    shop_name: { type: DataTypes.STRING(255), unique: true },
    owner_name: { type: DataTypes.STRING(30) },
    address: { type: DataTypes.STRING(100) },
    email_address: { type: DataTypes.STRING(30) },
    contact_no: { type: DataTypes.STRING(15) },
    website: { type: DataTypes.STRING(30) },
    updated_by: { type: DataTypes.INTEGER },
  },
  { timestamps: false, freezeTableName: true }
);

const AdsManagement = sequelize.define(
  "adsmanagement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    ad_name: { type: DataTypes.STRING(30) },
    shop_id: { type: DataTypes.INTEGER },
    banner_image: { type: DataTypes.BOOLEAN },
    description: { type: DataTypes.STRING(100) },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    ad_location: { type: DataTypes.BOOLEAN },
    amount: { type: DataTypes.DECIMAL },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const UserGroup = sequelize.define(
  "usergroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    group_name: { type: DataTypes.STRING(30) },
    description: { type: DataTypes.STRING(50) },
    allow_add: { type: DataTypes.BOOLEAN },
    allow_edit: { type: DataTypes.BOOLEAN },
    allow_delete: { type: DataTypes.BOOLEAN },
    allow_print: { type: DataTypes.BOOLEAN },
    allow_import: { type: DataTypes.BOOLEAN },
    allow_export: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Rental = sequelize.define(
  "rental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_id: { type: DataTypes.INTEGER },
    client_id: { type: DataTypes.INTEGER },
    rental_start_date: { type: DataTypes.DATE },
    rental_end_time: { type: DataTypes.DATE },
    total_amount: { type: DataTypes.DECIMAL },
    payment_status: { type: DataTypes.BOOLEAN },
    rental_status: { type: DataTypes.BOOLEAN },
    remarks: { type: DataTypes.STRING(100) },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: { type: DataTypes.STRING(30), unique: true },
    password: { type: DataTypes.STRING(100), unique: true },
    avatar: { type: DataTypes.STRING(50) },
    fullname: { type: DataTypes.STRING(50) },
    contact: { type: DataTypes.STRING(15) },
    email: { type: DataTypes.STRING(30) },
    user_category_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const BikeCategory = sequelize.define(
  "bikecategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_name: { type: DataTypes.STRING(50) },
    description: { type: DataTypes.STRING(100) },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const BikeInfo = sequelize.define(
  "bikeinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_category_id: { type: DataTypes.INTEGER },
    shop_id: { type: DataTypes.INTEGER },
    bike_name: { type: DataTypes.STRING(30) },
    specs: { type: DataTypes.STRING(100) },
    rent_price: { type: DataTypes.DECIMAL },
    availability: { type: DataTypes.BOOLEAN },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    client_code: { type: DataTypes.STRING(15) },
    avatar: { type: DataTypes.STRING(50) },
    client_name: { type: DataTypes.STRING(30) },
    email_address: { type: DataTypes.STRING(30) },
    contact_number: { type: DataTypes.STRING(15) },
    complete_address: { type: DataTypes.STRING(100) },
    username: { type: DataTypes.STRING(30) },
    password: { type: DataTypes.STRING(30) },
    status: { type: DataTypes.BOOLEAN },
    otp_id: { type: DataTypes.UUID },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rental_id: { type: DataTypes.INTEGER },
    payment_type: { type: DataTypes.INTEGER },
    paid_by: { type: DataTypes.STRING(30) },
    payment_date: { type: DataTypes.DATE },
    remarks: { type: DataTypes.STRING(100) },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Penalty = sequelize.define(
  "penalty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rental_id: { type: DataTypes.INTEGER },
    penalty_amount: { type: DataTypes.DECIMAL },
    payment_status: { type: DataTypes.BOOLEAN },
    remarks: { type: DataTypes.STRING(100) },
    paid_by: { type: DataTypes.STRING(30) },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    table_name: { type: DataTypes.STRING(30) },
    user_id: { type: DataTypes.INTEGER },
    user_os: { type: DataTypes.STRING(100) },
    user_device: { type: DataTypes.STRING(100) },
    token: { type: DataTypes.STRING(255) },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const OTP = sequelize.define(
  "otp",
  {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey:true,
    },
    otp: { type: DataTypes.STRING(255) },
    expiration_time: { type: DataTypes.DATE },
    verified: { type: DataTypes.BOOLEAN, default: false },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = {
  ShopInfo,
  AdsManagement,
  UserGroup,
  Rental,
  User,
  BikeCategory,
  BikeInfo,
  Client,
  Payment,
  Penalty,
  Token,
  OTP,
};
