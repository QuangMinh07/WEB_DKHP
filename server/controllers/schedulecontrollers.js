const Schedule = require("../models/schedule");
const { errorHandler } = require("../utils/error");

const createSchedule = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép tạo lịch học"));
  }
  const {
    STT,
    maHP,
    thoigianbatdau,
    thoigianketthuc,
    day,
    room,
    lop,
    teacher,
  } = req.body;

  const newSchedule = new Schedule({
    thoigianketthuc,
    thoigianbatdau,
    day,
    room,
    lop,
    maHP,
    STT,
    teacher,
  });
  try {
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    next(error);
  }
};

const getSchedule = async (req, res, next) => {
  try {
    const schedules = await Schedule.find(req.query);
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSchedule,
  getSchedule,
};
