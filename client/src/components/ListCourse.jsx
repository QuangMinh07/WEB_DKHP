import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ListCourse = () => {
  const { createUser } = useSelector((state) => state.user);
  const [course, setCourse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/v1/course/getCourse?userId=${createUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setCourse(data.posts);
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
        `/v1/course/deleteCourse/${courseIdToDelete}/${createUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCourse((prev) =>
          prev.filter((post) => post._id !== courseIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {createUser.isAdmin && course.length > 0 ? (
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
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Xóa
              </Table.HeadCell>
            </Table.Head>
            {course.map((course) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="border border-gray-200">
                    {new Date(course.updatedAt).toLocaleDateString()}
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
                      <FaCheck className="text-green-500 " />
                    ) : (
                      <FaTimes className="text-red-500 " />
                    )}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCourseIdToDelete(course._id);
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

export default ListCourse;
