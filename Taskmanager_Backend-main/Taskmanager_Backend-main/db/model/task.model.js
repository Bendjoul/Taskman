const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    description : {
        type: String,
        required: true,
        trim: true,
    },
    completed : {
        type: Boolean,
        default: false,
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: false,
    }
});

const Task = model('task', taskSchema);


module.exports = Task;
// Compare this snippet from Backend/routes/users.js: