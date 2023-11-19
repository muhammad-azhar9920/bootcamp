"use strict";
// Getting elemets
const englishMarks = document.querySelectorAll("input")[0];
const urduMarks = document.querySelectorAll("input")[1];
const mathMarks = document.querySelectorAll("input")[2];
const physicsMarks = document.querySelectorAll("input")[3];
const chemistryMarks = document.querySelectorAll("input")[4];
const computerMarks = document.querySelectorAll("input")[5];
const btn = document.querySelector("#btn");
const showGrade = document.querySelector("#showGrade");
btn.addEventListener('click', (e) => {
    e.preventDefault();
    // checking for empty values
    if (englishMarks.value === "" || urduMarks.value === "" || mathMarks.value === "" || physicsMarks.value === ""
        || chemistryMarks.value === "" || computerMarks.value === "") {
        alert("Please fill in all Subjects Marks !");
    }
    else {
        // OBTAIN MARKS
        const obtainMarks = Number(englishMarks.value) + Number(urduMarks.value) + Number(mathMarks.value)
            + Number(physicsMarks.value) + Number(chemistryMarks.value) + Number(computerMarks.value);
        // PERCENTAGE
        const percenTage = (obtainMarks / 600) * 100;
        // GRADE
        let grade = "grade";
        if (percenTage >= 90) {
            grade = "A-1";
        }
        else if (percenTage >= 80) {
            grade = "A";
        }
        else if (percenTage >= 70) {
            grade = "B";
        }
        else if (percenTage >= 50) {
            grade = "C";
        }
        else if (percenTage >= 40) {
            grade = "PASS";
        }
        else {
            grade = "Fail";
        }
        showGrade.innerHTML = `<h1>Results of Marks</h1>
                                    <h3><i>Obtain Marks are : </i><b>${obtainMarks}</b></h3>
                                    <h3><i>Percentage is : </i><b>${percenTage.toFixed()}%</b></h3>
                                    <h3><i>Grade is : </i><b>${grade}</b></h3>`;
    }
});
