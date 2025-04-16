const {Task, User} = require('../model');

const createTask = async (taskData) => {
    try {
        const task = await Task.create(taskData);
        return task;
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
}

const updateTask = async (taskId, taskData) => {
    try {
        await Task.findByIdAndUpdate(taskId, taskData)
        const result = await Task.findById(taskId);
        return result;
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
}

// const deleteManyTasks = async (query = { ids: [] }) => {
//     try {
//         // You can now call this function with { completed: true } 
//         // to get all completed tasks, or with no parameter to get all tasks
//         const result = await Task.find(query);
//         return result;
//     } catch (error) {
//         throw new Error('Error finding completed tasks: ' + error.message);
//     }
// }

const getOwnerTasks = async (ownerId) => {
    try {
        const tasks = await Task.find({ owner: ownerId });
        return tasks;
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
}

const deleteTask = async (taskId) => {
    try {
        const result = await Task.findByIdAndDelete(taskId);
        return result;
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
}

module.exports = {
    createTask,
    updateTask,
    getOwnerTasks,
    deleteTask
};