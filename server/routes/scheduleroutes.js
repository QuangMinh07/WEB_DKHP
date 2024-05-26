const {
  createSchedule,
  getSchedule,
  deleteSchedule,
  getSchedule1,
} = require("../controllers/schedulecontrollers");
const { veryfyUser } = require("../utils/veryfyUser");

const router = require("express").Router();

router.post("/create", veryfyUser, createSchedule);
router.get("/getSchedule", getSchedule);
router.get("/getSchedule1", getSchedule1);
router.delete(
  "/deleteschedule/:scheduleId/:userId",
  veryfyUser,
  deleteSchedule
);

module.exports = router;
