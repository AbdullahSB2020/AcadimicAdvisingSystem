const mongoose = require("mongoose");

const advisorSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    advisorID: {
        type: Number,
        requried: true
    },
    activeAdvisor: {
        type: Boolean,
        default: false,
    }
})

const Advisor = mongoose.model('advisor', advisorSchema);

module.exports = Advisor; 