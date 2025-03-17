const task = require("../Models/task")

const createTask = async (req, res) => {
    try {
        const task = new task({ ...req.body, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await task.deleteOne();
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createTask, getTasks, deleteTask };
