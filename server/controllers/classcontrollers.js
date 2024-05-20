const Class = require("../models/class");
const { errorHandler } = require("../utils/error");

const createClass = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép tạo một lớp học"));
  }
  const { course, instructor, semester, year, maxStudents, schedule } =
    req.body;
  if (!course || !instructor || !semester || !year) {
    return next(
      errorHandler(400, "Vui lòng cung cấp tất cả các trường bắt buộc")
    );
  }
  const newClass = new Class({
    course,
    instructor,
    semester,
    year,
    maxStudents,
    schedule,
  });
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    next(error);
  }
};

const getClass = async (req, res, next) => {
  try {
    const classes = await Class.find(req.query);
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

const updateClass = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép cập nhật lớp"));
  }
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép xóa lớp"));
  }
  try {
    await Class.findByIdAndDelete(req.params.classId);
    res.status(200).json("Lớp học đã bị xóa");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClass,
  getClass,
  updateClass,
  deleteClass,
};
