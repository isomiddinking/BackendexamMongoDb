const { Schema, model } = require("mongoose");
const { Car } = require("./carSchema");
const { House } = require("./houseSchema");
const { Edu } = require("./eduSchema");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fristname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  birthday: { type: String },
  gander: { type: String, enum: ["male", "female"] },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  car_id: { type: Schema.Types.ObjectId, ref: Car },
  house_id: { type: Schema.Types.ObjectId, ref: House },
  edu_id: { type: Schema.Types.ObjectId, ref: Edu },
});
const User = model("User", userSchema);

module.exports = { User };
