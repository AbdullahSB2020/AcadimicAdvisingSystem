const mongoose = require('mongoose');

const academicSchema = mongoose.Schema({
    advisor: {
        type: String
    },
    students: [{
        type: String,
    }]
})

const AcademicNumbers = mongoose.model('academicNumbers',academicSchema);

module.exports = AcademicNumbers;