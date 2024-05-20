import React, { useState, useEffect } from "react";
import logo from "../image/logo.jpg";
import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import anh from "../image/anh1.png";

const DetailDKHP = () => {
  const nav = useNavigate();
  const { createUser } = useSelector((state) => state.user);
  const [course, setCourse] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [previousTerm, setPreviousTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedScheduleRow, setSelectedScheduleRow] = useState(null);
  const [registerSchedule, setRegisterSchedule] = useState([]);
  const [registrationInfo, setRegistrationInfo] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/v1/course/getCourse`);
        const data = await res.json();
        if (res.ok) {
          const sortedCourses = data.posts.sort((a, b) => a.STT - b.STT);
          setCourse(sortedCourses);
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

  const ClickDKHP = () => {
    nav("/DetailDKHP");
  };

  const ClickDetail = () => {
    nav("/Control?tab=profile");
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setSelectedCourse(filteredCourses[index]);
  };

  useEffect(() => {
    if (selectedTerm !== previousTerm) {
      setSelectedRow(null);
    }
    setPreviousTerm(selectedTerm);
  }, [selectedTerm, previousTerm]);

  const filteredCourses = selectedTerm
    ? course.filter((course) => course.term === selectedTerm)
    : course;

  const handleScheduleRowClick = (index) => {
    setSelectedScheduleRow(index);
  };

  const fetchRegisteredSchedule = async (userId) => {
    try {
      const res = await fetch(
        `/v1/registerschedule/getRegisterByStudent/${userId}`
      );
      const data = await res.json();
      if (res.ok) {
        setRegisterSchedule(data.registrations);
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

  const handleRegisterSchedule = async () => {
    if (!selectedCourse || schedule.length === 0) {
      return;
    }
    try {
      const res = await fetch("/v1/registerSchedule/registerSchedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: createUser._id,
          courseId: selectedCourse,
          scheduleId: schedule[0]._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegistrationInfo(data.registration);
        fetchRegisteredCourses(createUser._id);
        //phải load lại trang và chọn học kì thì mới thấy được bảng đã đăng ký
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
          justifyContent: "center",
          marginTop: 150,
          alignItems: "center",
        }}
      >
        <label htmlFor="termSelect" style={{ marginRight: 10 }}>
          Chọn học kỳ:
        </label>
        <select
          id="termSelect"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          style={{
            padding: 5,
            borderRadius: 5,
            border: "1px solid #DADADA",
            width: 150,
          }}
        >
          <option value="">Chọn học kỳ</option>
          <option value="HK 1 2023-2024">HK 1 2023-2024</option>
          <option value="HK 2 2023-2024">HK 2 2023-2024</option>
          <option value="HK 1 2024-2025">HK 1 2024-2025</option>
          <option value="HK 2 2024-2025">HK 2 2024-2025</option>
        </select>
      </div>

      {selectedTerm && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <h3>Danh sách khóa học cho học kỳ {selectedTerm}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table
              className="table-fixed border-separate border-spacing-0"
              style={{ marginTop: 20, width: 1155 }}
            >
              <Table.Head className="borderborder-gray-200">
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                ></Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                >
                  STT
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                >
                  Mã môn học
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                >
                  Tên môn học
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                >
                  Số tín chỉ
                </Table.HeadCell>
                <Table.HeadCell
                  className="border border-gray-200"
                  style={{ backgroundColor: "#4169E1", color: "white" }}
                >
                  Bắt buộc
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="border border-gray-200">
                {filteredCourses.map((course, index) => (
                  <React.Fragment key={index}>
                    <Table.Row
                      style={{
                        backgroundColor:
                          selectedRow === index ? "#FFFACD" : "transparent",
                        borderColor: "#DADADA",
                      }}
                      onClick={() => handleRowClick(index)}
                    >
                      <Table.Cell className="border border-gray-200">
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor:
                              selectedRow === index ? "blue" : "gray",
                            cursor: "pointer",
                          }}
                        ></div>
                      </Table.Cell>
                      <Table.Cell className="border border-gray-200">
                        {course.STT}
                      </Table.Cell>
                      <Table.Cell className="border border-gray-200">
                        {course.MaHP}
                      </Table.Cell>
                      <Table.Cell className="border border-gray-200">
                        {course.tenMonHoc}
                      </Table.Cell>
                      <Table.Cell className="border border-gray-200">
                        {course.tinChi}
                      </Table.Cell>
                      <Table.Cell className="border border-gray-200">
                        {course.BatBuoc ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </Table.Cell>
                    </Table.Row>

                    {selectedRow === index && selectedCourse && (
                      <div>
                        <div
                          style={{
                            marginLeft: 450,
                            width: 300,
                          }}
                        >
                          <p
                            style={{
                              fontSize: 30,
                              color: "#FFA500",
                              fontWeight: "bold",
                              marginTop: 30,
                            }}
                          >
                            Danh Sách Lịch Học
                          </p>
                        </div>
                        <Table.Row>
                          <Table.Cell
                            colSpan="6" // Span across all columns
                          >
                            <div style={{ textAlign: "center", marginTop: 20 }}>
                              <Table
                                className="table-fixed border-separate border-spacing-0"
                                style={{ width: 1112 }}
                              >
                                <Table.Head className="borderborder-gray-200">
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    {""}
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    STT
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Mã HP
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Lịch Học
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Phòng
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Lớp
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Giảng Viên
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Thời Gian Bắt Đầu
                                  </Table.HeadCell>
                                  <Table.HeadCell
                                    className="border border-gray-200"
                                    style={{
                                      backgroundColor: "#4169E1",
                                      color: "white",
                                    }}
                                  >
                                    Thời Gian Kết Thúc
                                  </Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                                  {schedule
                                    .filter(
                                      (item) =>
                                        item.maHP === selectedCourse.MaHP
                                    )
                                    .map((scheduleItem, scheduleIndex) => (
                                      <Table.Row
                                        key={scheduleIndex}
                                        style={{
                                          backgroundColor:
                                            selectedScheduleRow ===
                                            scheduleIndex
                                              ? "#FFFACD"
                                              : "transparent",
                                          borderColor: "#DADADA",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleScheduleRowClick(scheduleIndex)
                                        }
                                      >
                                        <Table.Cell className="border border-gray-200">
                                          <div
                                            style={{
                                              width: 10,
                                              height: 10,
                                              borderRadius: "50%",
                                              backgroundColor:
                                                selectedScheduleRow ===
                                                scheduleIndex
                                                  ? "blue"
                                                  : "gray",
                                            }}
                                          ></div>
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.STT}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.maHP}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.day}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.room}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.lop}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.teacher}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.thoigianbatdau}
                                        </Table.Cell>
                                        <Table.Cell className="border border-gray-200">
                                          {scheduleItem.thoigianketthuc}
                                        </Table.Cell>
                                      </Table.Row>
                                    ))}
                                </Table.Body>
                              </Table>
                            </div>
                          </Table.Cell>
                        </Table.Row>

                        {selectedScheduleRow !== null && (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 480,
                                width: 200,
                              }}
                            >
                              <Button onClick={handleRegisterSchedule}>
                                Đăng Ký Môn Học
                              </Button>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 450,
                                width: 250,
                              }}
                            >
                              {registrationInfo && (
                                <div className="mt-5 p-4 bg-yellow-100 text-white-700 rounded">
                                  <p style={{ fontSize: 20 }}>
                                    Đăng ký thành công
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div style={{ marginTop: 20 }}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Table.Body>

              {registerSchedule.length > 0 && (
                <div>
                  <p
                    style={{
                      fontSize: 30,
                      color: "#FFA500",
                      width: 500,
                      marginLeft: 380,
                      fontWeight: "bold",
                      marginTop: 20,
                    }}
                  >
                    Danh sách môn học đã đăng ký
                  </p>

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
                        Lịch học
                      </Table.HeadCell>
                      <Table.HeadCell
                        className="border border-gray-200"
                        style={{
                          backgroundColor: "#4169E1",
                          color: "white",
                        }}
                      >
                        Giờ Học
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
                        Tên giảng viên
                      </Table.HeadCell>
                      <Table.HeadCell
                        className="border border-gray-200"
                        style={{
                          backgroundColor: "#4169E1",
                          color: "white",
                        }}
                      >
                        Trạng thái
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
                          <Table.Cell className="border border-gray-200">{`${registration.schedule.day}`}</Table.Cell>
                          <Table.Cell className="border border-gray-200">{`${registration.schedule.thoigianbatdau} - ${registration.schedule.thoigianketthuc}`}</Table.Cell>
                          <Table.Cell className="border border-gray-200">
                            {registration.course.tinChi}
                          </Table.Cell>
                          <Table.Cell className="border border-gray-200">
                            {registration.fee}
                          </Table.Cell>
                          <Table.Cell className="border border-gray-200">
                            {registration.schedule.teacher}
                          </Table.Cell>
                          <Table.Cell className="border border-gray-200">
                            {registration.status}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    ))}
                  </Table>
                </div>
              )}
            </Table>
          </div>
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

export default DetailDKHP;
