
/**
 * return array with two objects the first for valid IDs 
 * and the other for the wrong IDs, 
 * should pass the 9 digit rule for a student
 * @param {Array} students unfiltered student IDs
 */

function getValidStudentID(students) {
    if(!Array.isArray(students)) return ;
    const match = /^\d{9}$/
    let validStudents = [];
    let notValidStudents = [];

    // sort students array into the two created arrays validStudents, notValidStudents
    students.forEach(id => {
        let pass = match.test(id)
        if(pass) validStudents.push(id);
        else notValidStudents.push(id);
    });
    
    // create the return array
    const allStudents = [
        {
            "reason":"correct id's that passed 9 digit test",
            value : validStudents
        },
        {
            "reason": "not valid id's that didn't pass 9 digit test",
            value : notValidStudents,
        }
    ]
    return allStudents
}

module.exports = {
    getValidStudentID,

} 