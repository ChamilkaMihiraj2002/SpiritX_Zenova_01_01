const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username is Already Existing"],
            minlength: [8, "Username must be at least 8 characters long"],
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9_-]{8,}$/.test(v);
                },
                message: props => `${props.value} is not a valid username!`
            }
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: function(v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(v);
                },
                message: props => 'Password must contain at least one lowercase letter, one uppercase letter, and one special character'
            }
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is Already Existing']
        },
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;