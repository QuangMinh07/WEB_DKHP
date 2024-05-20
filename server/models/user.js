const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    phone: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mssv: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    class: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
