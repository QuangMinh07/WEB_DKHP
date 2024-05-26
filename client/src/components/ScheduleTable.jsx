import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";

const scheduleData = [
  {
    day: "Thứ 2",
    date: "15/04/2024",
    morning: null,
    afternoon: null,
    evening: null,
  },
  {
    day: "Thứ 3",
    date: "16/04/2024",
    morning: null,
    afternoon: null,
    evening: null,
  },
  {
    day: "Thứ 4",
    date: "17/04/2024",
    morning: {
      subject: "Công nghệ mới trong phát triển ứng dụng CNTT",
      code: "DHKTPM16BTT - 422000326202",
      period: "4 - 6",
      room: "H4.2.1",
      teacher: "Trần Thế Trung",
    },
    afternoon: null,
    evening: null,
  },
  {
    day: "Thứ 5",
    date: "18/04/2024",
    morning: null,
    afternoon: null,
    evening: null,
  },
  {
    day: "Thứ 6",
    date: "19/04/2024",
    morning: null,
    afternoon: null,
    evening: null,
  },
  {
    day: "Thứ 7",
    date: "20/04/2024",
    morning: {
      subject: "Kiến trúc và Thiết kế phần mềm",
      code: "DHKTPM16DTT - 422000191404",
      period: "4 - 6",
      room: "V14.01",
      teacher: "Võ Văn Hải",
    },
    afternoon: null,
    evening: null,
  },
  {
    day: "Chủ nhật",
    date: "21/04/2024",
    morning: {
      subject: "Kiến trúc và Thiết kế phần mềm",
      code: "DHKTPM16DTT - 422000191404",
      period: "4 - 6",
      room: "H3.1.1",
      teacher: "Võ Văn Hải",
    },
    afternoon: null,
    evening: null,
  },
];

const ScheduleTable = () => {
  const [course, setCourse] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/v1/course/getCourse`);
        const data = await res.json();
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
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
  });

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

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
      }}
    >
      <p
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginLeft: 20,
          color: "#696969",
          marginTop: 20,
        }}
      >
        Lịch học, lịch thi theo tuần
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 10,
          alignItems: "center",
          marginLeft: 190,
        }}
      >
        <div>
          <input type="radio" id="all" name="filter" value="all" checked />
          <label style={{ marginLeft: 10 }} htmlFor="all">
            Tất cả
          </label>
          <input
            style={{ marginLeft: 10 }}
            type="radio"
            id="classes"
            name="filter"
            value="classes"
          />
          <label style={{ marginLeft: 10 }} htmlFor="classes">
            Lịch học
          </label>
          <input
            style={{ marginLeft: 10 }}
            type="radio"
            id="exams"
            name="filter"
            value="exams"
          />
          <label style={{ marginLeft: 10 }} htmlFor="exams">
            Lịch thi
          </label>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input style={{ marginLeft: 10 }} type="date" value="2024-04-15" />
          <Button style={{ marginLeft: 10, backgroundColor: "#1E90FF" }}>
            Hiện tại
          </Button>
          <Button style={{ marginLeft: 10, backgroundColor: "#1E90FF" }}>
            In lịch
          </Button>
          <Button style={{ marginLeft: 10, backgroundColor: "#1E90FF" }}>
            Trở về
          </Button>
          <Button style={{ marginLeft: 10, backgroundColor: "#1E90FF" }}>
            Tiếp
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          borderCollapse: "collapse",
          width: "97%",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <div style={{ display: "contents" }}>
          <div
            style={{
              border: "1px solid #ddd",
              textAlign: "center",
              padding: "8px",
              backgroundColor: "#f2f2f2",
            }}
          >
            Ca học
          </div>
          {scheduleData.map((day, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                textAlign: "center",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              {day.day} <br /> {day.date}
            </div>
          ))}
        </div>
        <div style={{ display: "contents" }}>
          <div
            style={{
              border: "1px solid #ddd",
              textAlign: "left",
              padding: "8px",
              backgroundColor: "#FFFACD",
            }}
          >
            Sáng
          </div>
          {scheduleData.map((day, index) => (
            <div
              key={index}
              style={
                day.morning
                  ? {
                      border: "1px solid #ddd",
                      textAlign: "left",
                      padding: "8px",
                      backgroundColor: "#90ee90",
                    }
                  : {
                      border: "1px solid #ddd",
                      textAlign: "left",
                      padding: "8px",
                      backgroundColor: "#FFFFFF",
                    }
              }
            >
              {day.morning && (
                <div>
                  <p>{day.morning.subject}</p>
                  <p>{day.morning.code}</p>
                  <p>Tiết: {day.morning.period}</p>
                  <p>Phòng: {day.morning.room}</p>
                  <p>GV: {day.morning.teacher}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "contents" }}>
          <div
            style={{
              border: "1px solid #ddd",
              textAlign: "left",
              padding: "8px",
              backgroundColor: "#FFFACD",
            }}
          >
            Chiều
          </div>
          {scheduleData.map((day, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#FFFFFF",
              }}
            ></div>
          ))}
        </div>
        <div style={{ display: "contents" }}>
          <div
            style={{
              border: "1px solid #ddd",
              textAlign: "left",
              padding: "8px",
              backgroundColor: "#FFFACD",
            }}
          >
            Tối
          </div>
          {scheduleData.map((day, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#FFFFFF",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 25,
          marginLeft: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#d3d3d3",
            }}
          ></div>
          <span style={{ marginLeft: 10 }}>Lịch học lý thuyết</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#90ee90",
              marginLeft: 20,
            }}
          ></div>
          <span style={{ marginLeft: 10 }}>Lịch học thực hành</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#add8e6",
              marginLeft: 20,
            }}
          ></div>
          <span style={{ marginLeft: 10 }}>Lịch học trực tuyến</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#FFFACD",
              marginLeft: 20,
            }}
          ></div>
          <span style={{ marginLeft: 10 }}>Lịch thi</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#ff6347",
              marginLeft: 20,
            }}
          ></div>
          <span style={{ marginLeft: 10 }}>Lịch tạm ngưng</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
