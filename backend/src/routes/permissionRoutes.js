const router = require("express").Router();

const controller = require("../controllers/permissionController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getPermissions);
router.get("/:id", auth, controller.getPermission);
router.post("/", auth, controller.createPermission);
router.put("/:id", auth, controller.updatePermission);
router.delete("/:id", auth, controller.deletePermission);

module.exports = router;