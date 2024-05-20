const { model, Schema } = require("mongoose");

const registerschedule = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Đã đăng ký", "Đã hủy", "Đã hoàn thành"],
      default: "Đã đăng ký",
    },
  },
  { timestamps: true }
);

registerschedule.pre("save", async function (next) {
  const course = await this.model("Course").findById(this.course);
  if (course) {
    this.fee = parseInt(course.tinChi) * 900000;
  } else {
    throw new Error("Course not found");
  }
  next();
});

module.exports = model("Registerschedule", registerschedule);
