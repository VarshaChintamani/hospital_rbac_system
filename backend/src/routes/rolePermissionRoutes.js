const router = require("express").Router();

const controller = require("../controllers/rolePermissionController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getRolePermissions);
router.get("/:id", auth, controller.getRolePermission);
router.post("/", auth, controller.createRolePermission);
router.put("/:id", auth, controller.updateRolePermission);
router.delete("/:id", auth, controller.deleteRolePermission);

module.exports = router;