const {Task, User} = require('../model');

const createUser = async (data) => {
    console.log("data: ", data)
    try {
        const instance = new User(data);
        const user = await instance.save();
        console.log("user: ", user)
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

const updateUser = async (userId, userData) => {
    try {
        await User.findByIdAndUpdate(userId, userData)
        const result = await User.findById(userId);
        return result;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}

const findOneUser = async (query) => {
    try {
        const result = await User.findOne(query);
        return result;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
}

const getUsers = async (ownerId) => {
    try {
        const users = await User.find({ owner: ownerId });
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
}

const deleteUser = async (userId) => {
    try {
        const result = await User.findByIdAndDelete(userId);
        return result;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}

module.exports = {
    createUser,
    updateUser,
    findOneUser,
    getUsers,
    deleteUser
};