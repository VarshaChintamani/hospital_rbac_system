const router = require("express").Router();

const controller = require("../controllers/departmentController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getDepartments);
router.get("/:id", auth, controller.getDepartment);
router.post("/", auth, controller.createDepartment);
router.put("/:id", auth, controller.updateDepartment);
router.delete("/:id", auth, controller.deleteDepartment);

module.exports = router;