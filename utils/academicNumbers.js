const AcademicNumbers = require('../models/academicNumbers');



/**
 * get unique ids from two arrays which are in String
 * @param {Array} oldStudentIDs 
 * @param {Array} newStudentIDs 
 * 
 */
const removeSimilarStudents = (oldStudentIDs = [], newStudentIDs = []) => {
	if(!Array.isArray(oldStudentIDs) || !Array.isArray(newStudentIDs)) return []	
    // so I should do elemnating first then concatating second
    
	for( i = 0; i < oldStudentIDs.length; i++){
		for(j = 0; j < newStudentIDs.length; j++){
			if(oldStudentIDs[i] == newStudentIDs[j]){
				newStudentIDs.splice(j,1);
			}
		}
	}
	
	return oldStudentIDs.concat(newStudentIDs);
}

async function submitAcademicNumbers(advisorID, studentIDs) {

     // a test for the advisorID which should contain 6 number digits
     const match = /^\d{6}$/
     const advisorPass = match.test(advisorID)
     if (!advisorPass) return // if the advisor number is does not contain 6 number digits
 
     if (!(Array.isArray(studentIDs))) return;// check the params of the function

    // here I should submit the student IDs
    // Now I want to have only one update for the advisor (fetch data from DB) 1st
    // if he already has students -> compare
    // then update                \
    // otherwise                    >> decide
    // create new advisor         /

    const academicNumbers = await AcademicNumbers.findOne({advisor: advisorID});

    if(academicNumbers){
        // here will update advisor students'
        const addedStudents = await removeSimilarStudents(academicNumbers.students,studentIDs);

        try {
            await AcademicNumbers.findOneAndUpdate({advisor:advisorID},{students:addedStudents})
            .then(res => {
                console.log("updated Students");
                console.log(res);
            })
        } catch(err){
            console.log(err)
        }
        
    } else {
        
        const newEntry = new AcademicNumbers({
            advisor: String(advisorID),
            students: studentIDs,
        });
        console.log(newEntry);
    
        try {
            
            await newEntry.save()
                .then(res => {
                    console.log("What entered to DB: ");
                    console.log(res);
                })
    
        } catch (err) {
            // for now console_log the error
            // I might have other way handle the error
            console.log("the error happened here: ")
            console.log(err);
        }
    }
    
}

module.exports = {
    submitAcademicNumbers
}