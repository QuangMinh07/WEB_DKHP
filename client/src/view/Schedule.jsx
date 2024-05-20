import { Alert, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    maHP: "",
    lop: "",
    day: "",
    thoigianbatdau: "",
    thoigianketthuc: "",
    room: "",
    STT: "",
    teacher: "",
  });
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const registerSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/v1/schedule/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setSuccessMessage("Lịch học được tạo thành công");
        setFormData({
          maHP: "",
          lop: "",
          day: "",
          thoigianbatdau: "",
          thoigianketthuc: "",
          room: "",
          STT: "",
          teacher: "",
        });
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-2 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-4 font-semibold">Tạo lịch học</h1>
      <form className="flex flex-col gap-4" onSubmit={registerSchedule}>
        <div className="flex flex-col gap-4 justify-between">
          <TextInput
            type="text"
            placeholder="Số thứ tự"
            required
            id="STT"
            className="flex-1"
            value={formData.STT}
            onChange={(e) => setFormData({ ...formData, STT: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Mã HP"
            required
            id="maHP"
            className="flex-1"
            value={formData.maHP}
            onChange={(e) => setFormData({ ...formData, maHP: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Ngày học"
            required
            id="day"
            className="flex-1"
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Phòng"
            required
            id="room"
            className="flex-1"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="lớp"
            required
            id="lop"
            className="flex-1"
            value={formData.lop}
            onChange={(e) => setFormData({ ...formData, lop: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Giảng viên"
            required
            id="teacher"
            className="flex-1"
            value={formData.teacher}
            onChange={(e) =>
              setFormData({ ...formData, teacher: e.target.value })
            }
          />
          <TextInput
            type="time"
            placeholder="Thời gian bắt đầu"
            required
            id="thoigianbatdau"
            className="flex-1"
            value={formData.thoigianbatdau}
            onChange={(e) =>
              setFormData({ ...formData, thoigianbatdau: e.target.value })
            }
          />
          <TextInput
            type="time"
            placeholder="Thời gian kết thúc"
            required
            id="thoigianketthuc"
            className="flex-1"
            value={formData.thoigianketthuc}
            onChange={(e) =>
              setFormData({ ...formData, thoigianketthuc: e.target.value })
            }
          />
        </div>

        <Button
          type="submit"
          style={{
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "#1E90FF",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Tạo lịch học
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              nav("/Control?tab=profile");
              alert("Đăng xuất thành công!");
            }}
          >
            Đăng xuất
          </Button>
        </div>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {successMessage && (
          <Alert className="mt-5" color="success">
            {successMessage}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Schedule;
