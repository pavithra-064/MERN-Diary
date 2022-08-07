const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    otp : {
        type: String,
    }
}, {timestamps: true});

const Otp = mongoose.model('otp', otpSchema);
module.exports = Otp;