const router = require("express").Router();

const controller = require("../controllers/auditLogController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getAuditLogs);
router.get("/:id", auth, controller.getAuditLog);
router.post("/", auth, controller.createAuditLog);
router.put("/:id", auth, controller.updateAuditLog);
router.delete("/:id", auth, controller.deleteAuditLog);

module.exports = router;