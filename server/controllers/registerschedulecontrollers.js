const Registerschedule = require("../models/registerschedule");
const Course = require("../models/course");
const Schedule = require("../models/schedule");
const User = require("../models/user");
const { errorHandler } = require("../utils/error");

const registerSchedule = async (req, res, next) => {
  try {
    const { userId, courseId, scheduleId } = req.body;

    if (!userId || !courseId || !scheduleId) {
      return next(errorHandler(400, "Thiếu các trường bắt buộc"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "Không tìm thấy sinh viên"));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(errorHandler(404, "Không tìm thấy khóa học"));
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return next(errorHandler(404, "Không tìm thấy lịch học"));
    }

    const existingRegistration = await Registerschedule.findOne({
      user: userId,
      course: courseId,
      schedule: scheduleId,
    });

    if (existingRegistration) {
      return next(errorHandler(400, "Bạn đã đăng ký khóa học này"));
    }

    const newRegistration = new Registerschedule({
      user: userId,
      course: courseId,
      schedule: scheduleId,
      fee: parseInt(course.tinChi) * 900000,
      status: "Đã đăng ký",
    });

    await newRegistration.save();
    res.status(201).json({
      message: "Đăng ký thành công",
      registration: newRegistration,
    });
  } catch (error) {
    next(errorHandler(500, "Server error", error.message));
  }
};

const getRegisterByStudent = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "không tìm thấy sinh viên"));
    }

    const registrations = await Registerschedule.find({ user: userId })
      .populate("course")
      .populate("schedule");

    res.status(200).json({ registrations });
  } catch (error) {
    next(errorHandler(500, "Server error", error.message));
  }
};

module.exports = {
  registerSchedule,
  getRegisterByStudent,
};
