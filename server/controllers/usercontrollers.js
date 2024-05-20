const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "Bạn không được phép cập nhật người dùng này")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 4) {
      return next(errorHandler(400, "Mật khẩu phải có ít nhất 4 ký tự"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.mssv !== undefined) {
    if (req.body.mssv.length !== 8) {
      return next(errorHandler(400, "mssv phải có đúng 8 ký tự"));
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Tên người dùng phải có từ 7 đến 20 ký tự")
      );
    }
    if (!/^[a-zA-ZÀ-Ỹà-ỹ ]+$/.test(username)) {
      return next(
        errorHandler(
          400,
          "Tên phải bắt đầu bằng chữ cái viết hoa và chỉ chứa chữ cái"
        )
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          image: req.body.image,
          password: req.body.password,
          mssv: req.body.mssv,
          gender: req.body.gender,
          class: req.body.class,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
    console.log(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Bạn không được phép xóa người dùng này"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("Người dùng đã bị xóa");
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Bạn không được phép xem tất cả người dùng"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "Không tìm thấy user"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
