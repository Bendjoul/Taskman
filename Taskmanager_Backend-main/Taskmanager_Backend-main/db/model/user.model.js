const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
 },

 is_active: {
    type: Boolean,
    default: false,
    required: true,

},

password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
}
})

const User = model('user', userSchema);


module.exports = User;