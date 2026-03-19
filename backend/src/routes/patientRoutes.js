const router = require("express").Router();

const controller = require("../controllers/patientController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getPatients);
router.get("/:id", auth, controller.getPatient);
router.post("/", auth, controller.createPatient);
router.put("/:id", auth, controller.updatePatient);
router.delete("/:id", auth, controller.deletePatient);

module.exports = router;