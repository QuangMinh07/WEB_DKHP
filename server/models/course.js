const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    STT: {
      type: String,
      required: true,
    },
    MaHP: {
      type: String,
      required: true,
    },
    tenMonHoc: {
      type: String,
      required: true,
    },
    tinChi: {
      type: String,
      required: true,
    },
    BatBuoc: {
      type: Boolean,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    conditon: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);
