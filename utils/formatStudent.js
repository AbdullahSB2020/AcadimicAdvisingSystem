/**
 * format the students to get name and id and then send it to advisorStudents page 
 * to display all his students
 * 
 * @param {Array} students 
 */
function formatStudent (students) {
    const studentArray = [];
    students.forEach(student => {
        let s_obj = {
            name: student.username,
            id : student.studentID,
        }
        studentArray.push(s_obj);
    })

    return studentArray;
}

module.exports = {
    formatStudent,
}