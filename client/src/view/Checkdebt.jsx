import React, { useState, useEffect } from "react";
import logo from "../image/Screenshot 2024-05-27 050558.jpg";
import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import anh from "../image/anh1.png";

const Checkdebt = () => {
  const nav = useNavigate();
  const { createUser } = useSelector((state) => state.user);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registerSchedule, setRegisterSchedule] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/v1/course/getCourse`);
        const data = await res.json();
        if (res.ok) {
          setSchedule(data);
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`/v1/schedule/getSchedule`);
        const data = await res.json();
        if (res.ok) {
          setSchedule(data);
        } else {
          console.error("Failed to fetch schedule:", data.message);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  });

  const fetchRegisteredSchedule = async (userId) => {
    try {
      const res = await fetch(
        `/v1/registerschedule/getRegisterByStudent/${userId}`
      );
      const data = await res.json();
      if (res.ok) {
        setRegisterSchedule(data.registrations);
        let totalFee = 0;
        data.registrations.forEach((registration) => {
          totalFee += registration.fee;
        });
        setTotalFee(totalFee);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (createUser._id) {
      fetchRegisteredSchedule(createUser._id);
    }
  }, [createUser._id]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img style={{ height: 134 }} src={logo} alt="logo" />
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
        <img
          style={{ height: 180, width: 150 }}
          src={createUser.image}
          alt="user avatar"
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {registerSchedule.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: 30,
                  color: "#FFA500",
                  fontWeight: "bold",
                  marginTop: 60,
                }}
              >
                Tra Cứu Công Nợ
              </p>
            </div>

            <Table style={{ marginTop: 20, width: 1158, marginLeft: -2 }}>
              <Table.Head>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Số Thứ Tự
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Mã môn học
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Tên môn học
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  lớp học
                </Table.HeadCell>

                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Số Tín Chỉ
                </Table.HeadCell>

                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Học phí
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{
                    backgroundColor: "#4169E1",
                    color: "white",
                  }}
                >
                  Học Kì
                </Table.HeadCell>
              </Table.Head>
              {registerSchedule.map((registration, index) => (
                <Table.Body key={registration._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="border border-gray-200">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.course.MaHP}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.course.tenMonHoc}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.schedule.lop}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.course.tinChi}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.fee}
                    </Table.Cell>
                    <Table.Cell className="border border-gray-200">
                      {registration.course.term}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        )}
      </div>

      {registerSchedule.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            marginLeft: 140,
          }}
        >
          <p style={{ marginLeft: 20, fontSize: 16 }}>Tổng học phí:</p>
          <p style={{ marginLeft: 10, fontSize: 16, color: "red" }}>
            {totalFee.toLocaleString()} VND
          </p>
        </div>
      )}

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
            padding: 20,
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
            padding: 20,
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
        © 2024 ASCVN. Allrights reserved.
      </p>
    </div>
  );
};

export default Checkdebt;
