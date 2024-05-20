import React from "react";
import anh from "../image/anh1.png";
import logo from "../image/logo.jpg";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterHP = () => {
  const nav = useNavigate();

  const ClickDKHP = () => {
    nav("/DetailDKHP");
  };

  const ClickDetail = () => {
    nav("/Control?tab=profile");
  };
  const { createUser } = useSelector((state) => state.user);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img style={{ height: 134 }} src={logo} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -100,
        }}
      >
        <div
          style={{
            padding: 20,
            width: 1153,
            height: 272,
            marginTop: 120,
            border: "2px solid #DADADA",
          }}
        >
          <div
            style={{
              marginTop: -20,
              padding: 20,
              backgroundColor: "#00BFFF",
              width: 220,
              height: 270,
              marginLeft: -20,
            }}
          >
            <p style={{ color: "white", fontSize: 13, marginLeft: 10 }}>
              Xin chào!
            </p>

            <p
              style={{
                color: "white",
                fontSize: 20,
                marginLeft: 10,
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              {createUser.username}
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              Giới tính:
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 150,
                marginTop: -20,
              }}
            >
              {createUser.gender}
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              MSSV:
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 122,
                marginTop: -20,
              }}
            >
              {createUser.mssv}
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              Trạng thái:
            </p>

            <p
              style={{
                color: "white",
                fontSize: 13,
                marginLeft: 120,
                marginTop: -20,
              }}
            >
              Đang học
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  nav("/");
                  alert("Đăng xuất thành công!");
                }}
                style={{
                  marginTop: 20,
                  backgroundColor: "#FF7F50",
                  width: 300,
                }}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 410, marginTop: -230 }}>
        <img style={{ height: 180, width: 150 }} src={createUser.image} />
      </div>

      <div>
        <p
          variant="span"
          style={{
            marginLeft: 620,
            color: "#00BFFF",
            cursor: "pointer",
            marginTop: -130,
          }}
          onClick={ClickDetail}
        >
          THÔNG TIN SINH VIÊN
        </p>

        <p
          variant="span"
          style={{
            marginLeft: 620,
            color: "#00BFFF",
            cursor: "pointer",
            marginTop: 10,
          }}
          onClick={ClickDKHP}
        >
          ĐĂNG KÝ HỌC PHẦN
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            padding: 20, // Thêm khoảng cách giữa nội dung và viền
            width: 1153,
            height: 200,
            marginTop: 120,
            border: "2px solid #DADADA",
            borderLeft: "5px solid #00BFFF", // Đường viền bên trái màu xanh
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#1E90FF	", fontSize: 25, fontWeight: 700 }}>
              THÔNG TIN SINH VIÊN
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <p style={{ color: "black", fontSize: 16 }}>Khoá:</p>

            <p
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              2020 - 2021
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={{ color: "black", fontSize: 16 }}>Bậc đào tạo:</p>

            <p
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Đại học
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={{ color: "black", fontSize: 16 }}>Ngành:</p>

            <p
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Kỹ thuật phần mềm
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={{ color: "black", fontSize: 16 }}>Khoa:</p>

            <p
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Công nghệ thông tin
            </p>
          </div>

          <div style={{ marginLeft: 650, marginTop: -95 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p style={{ color: "black", fontSize: 16 }}>Lớp:</p>

              <p
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {createUser.class}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p style={{ color: "black", fontSize: 16 }}>Loại hình đào tạo:</p>

              <p
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Tiên tiến
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p style={{ color: "black", fontSize: 16 }}>Chuyên ngành:</p>

              <p
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Kỹ thuật phần mềm - 7480103
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p style={{ color: "black", fontSize: 16 }}>Cơ sở:</p>

              <p
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Cơ sở 1(Thành phố Hồ Chí Minh)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: 20, // Thêm khoảng cách giữa nội dung và viền
            backgroundColor: "#0069d9",
            width: 1153,
            marginTop: 15,
          }}
        >
          <p style={{ color: "white", fontSize: 13 }}>
            TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
          </p>
          <p style={{ color: "white", fontSize: 13 }}>
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
                top: -100,
                right: 34,
                fontSize: 13,
              }}
            >
              Thống kê truy cập
            </p>

            <p
              style={{
                color: "white",
                position: "absolute",
                top: -80,
                right: 0,
                fontSize: 13,
              }}
            >
              Lượt truy cập: 2104087
            </p>

            <p
              style={{
                color: "white",
                position: "absolute",
                top: -60,
                right: 39,
                fontSize: 13,
              }}
            >
              Đang online: 309
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: -10,
            padding: 20, // Thêm khoảng cách giữa nội dung và viền
            backgroundImage: `url(${anh})`,
            width: 1153,
          }}
        >
          <p style={{ color: "white", textAlign: "center", fontSize: 13 }}>
            Bản quyền 2018 - Trường Đại học Công nghiệp TP. Hồ Chí Minh
          </p>
        </div>
      </div>

      <p style={{ marginLeft: 160, fontSize: 13 }}>
        © 2024 ASCVN. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterHP;
