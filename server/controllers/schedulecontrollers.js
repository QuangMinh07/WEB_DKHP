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

const getSchedule1 = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Schedule.find({
      ...(req.query.STT && { STT: req.query.STT }),
      ...(req.query.maHP && { maHP: req.query.maHP }),
      ...(req.query.lop && { lop: req.query.lop }),
      ...(req.query.thoigianbatdau && {
        thoigianbatdau: req.query.thoigianbatdau,
      }),
      ...(req.query.thoigianketthuc && {
        thoigianketthuc: req.query.thoigianketthuc,
      }),
      ...(req.query.day && { day: req.query.day }),
      ...(req.query.room && { room: req.query.room }),
      ...(req.query.teacher && { teacher: req.query.teacher }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Schedule.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Schedule.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSchedule = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép xóa lịch học này"));
  }
  try {
    await Schedule.findByIdAndDelete(req.params.scheduleId);
    res.status(200).json("Lịch học đã bị xóa");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createSchedule,
  getSchedule,
  deleteSchedule,
  getSchedule1,
};
