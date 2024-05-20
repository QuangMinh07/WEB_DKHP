import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
const Users = () => {
  const { createUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/v1/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
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
      const res = await fetch(`/v1/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {createUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Ngày tham gia
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Ảnh đại diện
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Họ tên
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Mã số sinh viên
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Giới tính
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Email
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Quản tri viên
              </Table.HeadCell>
              <Table.HeadCell
                className="border border-gray-200"
                style={{ backgroundColor: "#4169E1", color: "white" }}
              >
                Xóa
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="border border-gray-200">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Table.Cell>

                  <Table.Cell className="border border-gray-200">
                    {user.username}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {user.mssv}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {user.gender}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500 " />
                    ) : (
                      <FaTimes className="text-red-500 " />
                    )}
                  </Table.Cell>
                  <Table.Cell className="border border-gray-200">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        <p>Bạn chưa có bài viết nào!</p>
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
              Bạn có muốn xóa?
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeletePost}>Có</Button>
              <Button onClick={() => setShowModal(false)}>Không</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
