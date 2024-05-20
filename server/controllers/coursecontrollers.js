const Course = require("../models/course");
const { errorHandler } = require("../utils/error");

const createCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép tạo một khóa học"));
  }
  const { STT, MaHP, tenMonHoc, tinChi, BatBuoc, term } = req.body;
  if (!STT || !MaHP || !tenMonHoc || !tinChi) {
    return next(
      errorHandler(400, "Vui lòng cung cấp tất cả các trường bắt buộc")
    );
  }
  const newCourse = new Course({ STT, MaHP, tenMonHoc, tinChi, BatBuoc, term });
  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Course.find({
      ...(req.query.STT && { STT: req.query.STT }),
      ...(req.query.MaHP && { MaHP: req.query.MaHP }),
      ...(req.query.tenMonHoc && { tenMonHoc: req.query.tenMonHoc }),
      ...(req.query.tinChi && { tinChi: req.query.tinChi }),
      ...(req.query.BatBuoc && { _id: req.query.BatBuoc }),
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

    const totalPosts = await Course.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Course.countDocuments({
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

const deleteCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép xóa khóa học này"));
  }
  try {
    await Course.findByIdAndDelete(req.params.courseId);
    res.status(200).json("Khóa học đã bị xóa");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getCourse,
  deleteCourse,
};
