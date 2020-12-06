const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
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
    studentID: {
        type: Number,
        requried: true
    },
    myAdvisorID: { // we'll use this advisor id to sent posts
        type: Number,
        default: 0, 
    },
    // mobile: {
    //     type: Number,
    //     default: 0,
    // },
    // status:{ // if student graduate | undergradute
    //     type: String,
    //     default: '',
    // },
    // GPA: {
    //     type: Number,
    //     default: 0.00,
    // },
    // studyLevel: {
    //     type: String,
    //     default: '',
    // }
})

const Student = mongoose.model('student',studentSchema);
module.exports = Student ;