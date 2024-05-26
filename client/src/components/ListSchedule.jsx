import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";

const ListSchedule = () => {
  const { createUser } = useSelector((state) => state.user);
  const [schedule, setSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState("");
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/v1/schedule/getSchedule1?userId=${createUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setSchedule(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (createUser.isAdmin) {
      fetchPost();
    }
  }, [createUser._id]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/v1/schedule/deleteSchedule/${scheduleIdToDelete}/${createUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setSchedule((prev) =>
          prev.filter((post) => post._id !== scheduleIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = schedule.length;
    try {
      const res = await fetch(
        `/v1/schedule/getSchedule1?userId=${createUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setSchedule((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {createUser.isAdmin && schedule?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Ngày tạo
              </Table.HeadCell>
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
                Mã HP
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Lớp
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Thời gian bắt đầu
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Thời gian kết thúc
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Thứ
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Phòng
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Giảng Viên
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Xóa
              </Table.HeadCell>
            </Table.Head>
            {schedule.map((schedule) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="border border-gray-200">
                    {new Date(schedule.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.STT}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.maHP}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.lop}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.thoigianbatdau}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.thoigianketthuc}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.day}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.room}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {schedule.teacher}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setScheduleIdToDelete(schedule._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Thêm
            </button>
          )}
        </>
      ) : (
        <p>Bạn không có bài viết nào</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <p
              style={{ fontSize: 20, fontWeight: "bold", color: "red" }}
              className="mb-5 text-lg text-gray-500 dark:text-gray-400"
            >
              Bạn muốn xóa?
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeletePost}>có</Button>
              <Button onClick={() => setShowModal(false)}>Không</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListSchedule;
