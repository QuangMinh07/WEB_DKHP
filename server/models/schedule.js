const { model, Schema } = require("mongoose");

const scheduleSchema = new Schema(
  {
    STT: {
      type: String,
      default: null,
    },
    maHP: {
      type: String,
      ref: "Course",
      required: true,
    },
    lop: {
      type: String,
      default: null,
    },
    thoigianbatdau: {
      type: String,
      required: true,
    },
    thoigianketthuc: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },

    room: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Schedule", scheduleSchema);
