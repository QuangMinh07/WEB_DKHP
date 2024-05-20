const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, password, mssv, phone } = req.body;
  if (!username || !email || !password || !mssv || !phone) {
    next(errorHandler(400, "Tất cả các trường là bắt buộc"));
  }

  if (phone.length !== 10 || isNaN(phone)) {
    return next(errorHandler(400, "Số điện thoại phải có 10 số"));
  }

  if (mssv.length !== 8 || isNaN(mssv)) {
    return next(errorHandler(400, "MSSV phải có đúng 8 số"));
  }

  if (!/^[a-zA-ZÀ-Ỹà-ỹ ]+$/.test(username)) {
    return next(
      errorHandler(
        400,
        "Tên phải bắt đầu bằng chữ cái viết hoa và chỉ chứa chữ cái"
      )
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    mssv,
    phone,
  });
  try {
    await newUser.save();
    res.status(200).json("Đăng ký thành công");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  const { mssv, password } = req.body;
  if (!mssv || !password) {
    next(errorHandler(400, "Tất cả các trường là bắt buộc"));
  }
  try {
    const validUser = await User.findOne({ mssv });
    if (!validUser) {
      next(errorHandler(404, "Mssv người dùng không tồn tại"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Sai mật khẩu"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
