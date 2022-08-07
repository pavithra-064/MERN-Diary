const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Memory = mongoose.model('Mem', memSchema);

module.exports = Memory;