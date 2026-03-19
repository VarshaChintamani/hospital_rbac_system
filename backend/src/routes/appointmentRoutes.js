const router = require("express").Router();

const controller = require("../controllers/appointmentController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getAppointments);
router.get("/:id", auth, controller.getAppointment);
router.post("/", auth, controller.createAppointment);
router.put("/:id", auth, controller.updateAppointment);
router.delete("/:id", auth, controller.deleteAppointment);

module.exports = router;