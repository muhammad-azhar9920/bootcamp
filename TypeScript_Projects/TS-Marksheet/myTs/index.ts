// Getting elemets
const englishMarks = document.querySelectorAll("input")[0] as HTMLInputElement;
const urduMarks = document.querySelectorAll("input")[1] as HTMLInputElement;
const mathMarks = document.querySelectorAll("input")[2] as HTMLInputElement;
const physicsMarks = document.querySelectorAll("input")[3] as HTMLInputElement;
const chemistryMarks = document.querySelectorAll("input")[4] as HTMLInputElement;
const computerMarks = document.querySelectorAll("input")[5] as HTMLInputElement;
const btn = document.querySelector("#btn") as HTMLElement;
const showGrade = document.querySelector("#showGrade") as HTMLElement;


btn.addEventListener('click',(e)=>{
    e.preventDefault();
    // checking for empty values
    if(englishMarks.value === "" || urduMarks.value === "" || mathMarks.value === "" || physicsMarks.value === "" 
        || chemistryMarks.value === "" || computerMarks.value === ""){
            alert("Please fill in all Subjects Marks !");
        }else{
            // OBTAIN MARKS
            const obtainMarks:number = Number(englishMarks.value)+Number(urduMarks.value)+Number(mathMarks.value)
                            +Number(physicsMarks.value)+Number(chemistryMarks.value)+Number(computerMarks.value);
            // PERCENTAGE
            const percenTage:number = (obtainMarks/600)*100;

            // GRADE
            let grade:string = "grade";
            if(percenTage >= 90){
                grade = "A-1";
            }else if(percenTage >= 80){
                grade = "A";
            }else if(percenTage >= 70){
                grade = "B";
            }else if(percenTage >= 50){
                grade = "C";
            }else if(percenTage >= 40){
                grade = "PASS"
            }else{
                grade = "Fail";
            }
            showGrade.innerHTML = `<h1>Results of Marks</h1>
                                    <h3><i>Obtain Marks are : </i><b>${obtainMarks}</b></h3>
                                    <h3><i>Percentage is : </i><b>${percenTage.toFixed()}%</b></h3>
                                    <h3><i>Grade is : </i><b>${grade}</b></h3>`;
        }
})