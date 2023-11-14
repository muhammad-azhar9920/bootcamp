let userValue = document.querySelector("#userValue") as HTMLInputElement;
let showArray = document.querySelector("#showArray") as HTMLDivElement;
let AddIn1st = document.querySelector("#AddIn1st") as HTMLButtonElement;
let AddInLast = document.querySelector("#AddInLast") as HTMLButtonElement;
let DeleteIn1st = document.querySelector("#DeleteIn1st") as HTMLButtonElement;
let DeleteInLast = document.querySelector("#DeleteInLast") as HTMLButtonElement;
let Sort = document.querySelector("#Sort") as HTMLButtonElement;
let Reverse = document.querySelector("#Reverse") as HTMLButtonElement;

const myArray:string [] = [];
showArray.textContent = `Array = [${myArray}]`;

// Adding
AddIn1st.addEventListener('click',()=>{
    if(userValue.value !== ""){
        myArray.unshift(userValue.value);
        userValue.value = "";
        userValue.focus();
        showArray.textContent = `Array = [${myArray}]`;
    }else{
        alert("Value Required!");
    }
})
AddInLast.addEventListener('click',()=>{
    if(userValue.value !== ""){
        myArray.push(userValue.value);
        userValue.value = "";
        userValue.focus();
        showArray.textContent = `Array = [${myArray}]`;
    }else{
        alert("Value Required!");
    }
})
// Deleting
DeleteIn1st.addEventListener('click',()=>{
    myArray.shift();
    showArray.textContent = `Array = [${myArray}]`;
})
DeleteInLast.addEventListener('click',()=>{
    myArray.pop();
    showArray.textContent = `Array = [${myArray}]`;
})
// Sorting
Sort.addEventListener('click',()=>{
    myArray.sort();
    showArray.textContent = `Array = [${myArray}]`;
});
// Reverse
Reverse.addEventListener('click',()=>{
    myArray.reverse();
    showArray.textContent = `Array = [${myArray}]`;
});