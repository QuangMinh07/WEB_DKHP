import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DetailUser from "../components/DetailUser";
import Menu from "../components/Menu";
import ListCourse from "../components/ListCourse";
import Users from "../components/Users";
import RegisterHP from "./RegisterHP";
import ListSchedule from "../components/ListSchedule";
import ScheduleTable from "../components/ScheduleTable";
import Checkdebt from "./Checkdebt";

const Control = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "#A9A9A9" }}
    >
      <div>
        <Menu />
      </div>
      {tab === "sheduleTable" && <ScheduleTable />}
      {tab === "profile" && <DetailUser />}
      {tab === "course" && <ListCourse />}
      {tab === "schedule" && <ListSchedule />}
      {tab === "users" && <Users />}
      {tab === "hp" && <RegisterHP />}
      {tab === "Checkdebt" && <Checkdebt />}
    </div>
  );
};

export default Control;
