const {
  registerSchedule,
  getRegisterByStudent,
} = require("../controllers/registerschedulecontrollers");
const { veryfyUser } = require("../utils/veryfyUser");

const router = require("express").Router();

router.post("/registerSchedule", veryfyUser, registerSchedule);
router.get("/getRegisterByStudent/:userId", getRegisterByStudent);

module.exports = router;
