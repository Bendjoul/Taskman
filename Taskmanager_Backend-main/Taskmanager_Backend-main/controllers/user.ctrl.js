const {UserRepo} = require('../db/repository');

const postUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await UserRepo.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await UserRepo.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const getOwnerUsers = async (req, res) => {
//     try {
//         const ownerId = req.params.id;
//         const users = await UserRepo.getOwner(ownerId);
//         res.status(200).json(users);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const findOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserRepo.findOneUser({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserRepo.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postUser,
    updateUser,
    findOneUser,
    deleteUser
}; // Export the controller functions for use in the router