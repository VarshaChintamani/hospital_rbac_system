const router = require("express").Router();

const controller = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getUsers);
router.get("/:id", auth, controller.getUser);
router.put("/:id", auth, controller.updateUser);
router.delete("/:id", auth, controller.deleteUser);

module.exports = router;