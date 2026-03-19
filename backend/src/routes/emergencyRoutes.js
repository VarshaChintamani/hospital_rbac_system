const router = require("express").Router();

const controller = require("../controllers/emergencyController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, controller.requestEmergencyAccess);

router.get("/", auth, controller.getEmergencyLogs);
router.get("/:id", auth, controller.getEmergencyAccess);
router.put("/:id", auth, controller.updateEmergencyAccess);
router.delete("/:id", auth, controller.deleteEmergencyAccess);

module.exports = router;