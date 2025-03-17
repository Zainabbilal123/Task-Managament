const express = require("express");
const { createTask, getTasks, deleteTask } = require("../controller/taskcontroller");
const authMiddleware = require("../Middleware/authMiddleware")
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
