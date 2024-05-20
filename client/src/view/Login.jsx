import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginError, loginStart, loginSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../image/logo.jpg";
import anh from "../image/anh1.png";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mssv || !formData.password) {
      return dispatch(loginError("Không được để trống"));
    }
    try {
      dispatch(loginStart());
      const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginError(data.message));
      }
      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/Control");
        alert("Đăng nhập thành công!");
      }
    } catch (error) {
      dispatch(loginError(errorMessage));
    }
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ height: 150 }} src={logo} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            border: "2px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: 500,
          }}
        >
          <form
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              width: "450px",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <Label
                value="Mã Sinh Viên"
                style={{ fontWeight: "bold", fontSize: 17 }}
              />
              <TextInput
                type="mssv"
                id="mssv"
                onChange={handleOnChange}
                style={{ width: 300 }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Label
                value="Mật khẩu"
                style={{ fontWeight: "bold", fontSize: 17 }}
              />
              <TextInput
                type="password"
                id="password"
                onChange={handleOnChange}
                style={{ width: 300, marginLeft: 60 }}
              />
            </div>

            <Button
              type="submit"
              style={{
                width: 400,
                height: 60,
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#1E90FF",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <p style={{ fontSize: 20 }}>Đăng nhập</p>
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <span>Chưa có tài khoản</span>
            <Link
              to="/register"
              className="text-blue-500"
              style={{ marginLeft: 10 }}
            >
              Đăng ký
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            padding: 20,
            backgroundColor: "#0069d9",
            width: 1280,
          }}
        >
          <p style={{ color: "white", fontSize: 18 }}>
            TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
          </p>
          <p style={{ color: "white", fontSize: 18 }}>
            Địa chỉ: Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí
            Minh
            <br />
            Điện thoại: 0283 8940 390
            <br />
            Fax: 0283 9940 954
            <br />
            Email: dhcn@iuh.edu.vn
          </p>

          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                position: "absolute",
                top: -136,
                right: 40,
                fontSize: 18,
              }}
            >
              Thống kê truy cập
            </p>

            <p
              style={{
                color: "white",
                position: "absolute",
                top: -110,
                right: 0,
                fontSize: 18,
              }}
            >
              Lượt truy cập: 2104087
            </p>

            <p
              style={{
                color: "white",
                position: "absolute",
                top: -80,
                right: 47,
                fontSize: 18,
              }}
            >
              Đang online: 309
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: -10,
            padding: 20,
            backgroundImage: `url(${anh})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: 1280,
          }}
        >
          <p style={{ color: "white", textAlign: "center", fontSize: 18 }}>
            Bản quyền 2018 - Trường Đại học Công nghiệp TP. Hồ Chí Minh
          </p>
        </div>
      </div>

      <p style={{ marginLeft: 96, fontSize: 16 }}>
        © 2024 ASCVN. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
