const {TaskRepo} = require('../db/repository');
const {Task} = require('../db/model');

const postTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await TaskRepo.createTask(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await TaskRepo.updateTask(taskId, taskData);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOwnerTasks = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const tasks = await TaskRepo.getOwnerTasks(ownerId);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteManyTasks = async (req, res) => {
    try {
        // const result = await Task.deleteMany({ completed: true })
        // console.log('deleted many result: ', result)
        const {ids} = req.body;
        console.log('ids: ', ids)
        const deleted= await Task.deleteMany({ _id: { $in: ids } });
        console.log('deleted: ', deleted)
        const result = {...deleted, ids}
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = await TaskRepo.deleteTask(taskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postTask,
    updateTask,
    getOwnerTasks,
    deleteManyTasks,
    deleteTask
}; // Export the controller functions for use in the router