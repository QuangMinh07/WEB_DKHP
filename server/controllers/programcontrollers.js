const Program = require("../models/program");
const { errorHandler } = require("../utils/error");

const createProgram = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép tạo chương trình"));
  }
  const { programName, department, requiredCredits, courses } = req.body;
  if (!programName || !department || !requiredCredits) {
    return next(
      errorHandler(400, "Vui lòng cung cấp tất cả các trường bắt buộc")
    );
  }
  const newProgram = new Program({
    programName,
    department,
    requiredCredits,
    courses,
  });
  try {
    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    next(error);
  }
};

const getProgram = async (req, res, next) => {
  try {
    const programs = await Program.find(req.query);
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
};

const updateProgram = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "Bạn không được phép cập nhật chương trình này")
    );
  }
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.programId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProgram);
  } catch (error) {
    next(error);
  }
};

const deleteProgram = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép xóa chương trình này"));
  }
  try {
    await Program.findByIdAndDelete(req.params.programId);
    res.status(200).json("Chương trình đã bị xóa");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
};
