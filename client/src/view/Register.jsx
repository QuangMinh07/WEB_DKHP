import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.mssv ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      return setErrorMessage("Không được để trống");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
        alert("Đăng ký thành công!");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleForcus = () => {
    setErrorMessage(null);
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
        <img
          src="https://free-images.com/or/5be5/logo_iuh_png.jpg"
          style={{ width: 500, height: 200 }}
        ></img>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* left */}
        <div>
          <img
            src="https://moit.gov.vn/upload/2005517/20220405/mat_tien_nha_E_2021_42e23.jpg"
            style={{ height: 500, width: 600 }}
          />
        </div>
        {/* right */}
        <div>
          <form
            style={{ marginLeft: 30 }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Mã số sinh viên" style={{ fontSize: 17 }} />
              <TextInput
                type="text"
                placeholder="mssv"
                id="mssv"
                onFocus={handleForcus}
                onChange={handleOnChange}
                style={{ width: 500, marginTop: 10 }}
              />
            </div>

            <div>
              <Label value="Họ và tên " style={{ fontSize: 17 }} />
              <TextInput
                type="text"
                placeholder="Tên"
                id="username"
                onFocus={handleForcus}
                onChange={handleOnChange}
                style={{ width: 500, marginTop: 10 }}
              />
            </div>

            <div>
              <Label value="Email" style={{ fontSize: 17 }} />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleOnChange}
                style={{ width: 500, marginTop: 10 }}
              />
            </div>

            <div>
              <Label value="Mật khẩu" style={{ fontSize: 17 }} />
              <TextInput
                type="password"
                placeholder="Mật khẩu"
                id="password"
                onChange={handleOnChange}
                style={{ width: 500, marginTop: 10 }}
              />
            </div>
            <div>
              <Label value="Số điện thoại" style={{ fontSize: 17 }} />
              <TextInput
                type="phone"
                placeholder="Số điện thoại"
                id="phone"
                onChange={handleOnChange}
                style={{ width: 500, marginTop: 10 }}
              />
            </div>

            <Button
              type="submit"
              style={{
                width: 500,
                height: 60,
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#1E90FF",
                fontSize: "24px", // Đặt kích thước font lớn hơn
                fontWeight: "bold", // Đặt độ đậm cho font
              }}
            >
              <p style={{ fontSize: 20 }}>Đăng ký</p>
            </Button>
          </form>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Đã có tài khoản</span>
            <Link to="/" className="text-blue-500" style={{ marginLeft: 10 }}>
              Đăng nhập
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
