const router = require("express").Router();

const controller = require("../controllers/medicalRecordController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getMedicalRecords);
router.get("/:id", auth, controller.getMedicalRecord);
router.post("/", auth, controller.createMedicalRecord);
router.put("/:id", auth, controller.updateMedicalRecord);
router.delete("/:id", auth, controller.deleteMedicalRecord);

module.exports = router;