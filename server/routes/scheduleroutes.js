const {
  createSchedule,
  getSchedule,
} = require("../controllers/schedulecontrollers");
const { veryfyUser } = require("../utils/veryfyUser");

const router = require("express").Router();

router.post("/create", veryfyUser, createSchedule);
router.get("/getSchedule", getSchedule);

module.exports = router;
