import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";

const Course = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    STT: "",
    MaHP: "",
    tenMonHoc: "",
    tinChi: "uncategorized",
    BatBuoc: "uncategorized",
    term: "",
  });
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/v1/course/create", {
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
        setSuccessMessage("Môn học đc tạo thành công");
        setFormData({
          STT: "",
          MaHP: "",
          tenMonHoc: "",
          tinChi: "uncategorized",
          BatBuoc: "uncategorized",
          term: "",
        });
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-2 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-4 font-semibold">Tạo môn học</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            placeholder="Mã học phần"
            required
            id="MaHP"
            className="flex-1"
            value={formData.MaHP}
            onChange={(e) => setFormData({ ...formData, MaHP: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Tên môn học"
            required
            id="tenMonHoc"
            className="flex-1"
            value={formData.tenMonHoc}
            onChange={(e) =>
              setFormData({ ...formData, tenMonHoc: e.target.value })
            }
          />
          <Select
            value={formData.tinChi}
            onChange={(e) =>
              setFormData({ ...formData, tinChi: e.target.value })
            }
          >
            <option value="uncategorized">Số tín chỉ</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          <Select
            value={formData.BatBuoc}
            onChange={(e) =>
              setFormData({ ...formData, BatBuoc: e.target.value })
            }
          >
            <option value="uncategorized">Bắt buộc</option>
            <option value="true">Có</option>
            <option value="false">Không</option>
          </Select>
          <TextInput
            type="text"
            placeholder="Học Kì"
            required
            id="term"
            className="flex-1"
            value={formData.term}
            onChange={(e) => setFormData({ ...formData, term: e.target.value })}
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
          Tạo môn học
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
              nav("/Control?tab=course");
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

export default Course;
