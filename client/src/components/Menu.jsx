import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = () => {
  const [tab, setTab] = useState("");
  const { createUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full wd:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {createUser && !createUser.isAdmin && (
            <Link to="/Control?tab=sheduleTable">
              <Sidebar.Item active={tab === "sheduleTable"} labelColor="dark">
                Lịch Học Theo Tuần
              </Sidebar.Item>
            </Link>
          )}
          {createUser && createUser.isAdmin && (
            <Link to="/Control?tab=schedule">
              <Sidebar.Item active={tab === "schedule"} labelColor="dark">
                Quản lý lịch học
              </Sidebar.Item>
            </Link>
          )}
          {createUser && createUser.isAdmin && (
            <Link to="/Control?tab=course">
              <Sidebar.Item active={tab === "course"} labelColor="dark">
                Quản lý môn học
              </Sidebar.Item>
            </Link>
          )}
          {createUser && createUser.isAdmin && (
            <Link to="/Control?tab=users">
              <Sidebar.Item active={tab === "users"} labelColor="dark">
                Quản lý sinh viên
              </Sidebar.Item>
            </Link>
          )}

          <Link to="/Control?tab=profile">
            <Sidebar.Item active={tab === "profile"} labelColor="dark" as="div">
              Thông Tin Cá nhân
            </Sidebar.Item>
          </Link>

          {createUser && !createUser.isAdmin && (
            <Link to="/RegisterHP">
              <Sidebar.Item active={tab === "hp"} labelColor="dark">
                Đăng Ký Học Phần
              </Sidebar.Item>
            </Link>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Menu;
