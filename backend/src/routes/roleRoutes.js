const router = require("express").Router();

const controller = require("../controllers/roleController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getRoles);
router.get("/:id", auth, controller.getRole);
router.post("/", auth, controller.createRole);
router.put("/:id", auth, controller.updateRole);
router.delete("/:id", auth, controller.deleteRole);

module.exports = router;