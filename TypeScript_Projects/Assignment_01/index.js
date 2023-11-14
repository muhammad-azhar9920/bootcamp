var userValue = document.querySelector("#userValue");
var showArray = document.querySelector("#showArray");
var AddIn1st = document.querySelector("#AddIn1st");
var AddInLast = document.querySelector("#AddInLast");
var DeleteIn1st = document.querySelector("#DeleteIn1st");
var DeleteInLast = document.querySelector("#DeleteInLast");
var Sort = document.querySelector("#Sort");
var Reverse = document.querySelector("#Reverse");
var myArray = [];
showArray.textContent = "Array = [".concat(myArray, "]");
// Adding
AddIn1st.addEventListener('click', function () {
    if (userValue.value !== "") {
        myArray.unshift(userValue.value);
        userValue.value = "";
        userValue.focus();
        showArray.textContent = "Array = [".concat(myArray, "]");
    }
    else {
        alert("Value Required!");
    }
});
AddInLast.addEventListener('click', function () {
    if (userValue.value !== "") {
        myArray.push(userValue.value);
        userValue.value = "";
        userValue.focus();
        showArray.textContent = "Array = [".concat(myArray, "]");
    }
    else {
        alert("Value Required!");
    }
});
// Deleting
DeleteIn1st.addEventListener('click', function () {
    myArray.shift();
    showArray.textContent = "Array = [".concat(myArray, "]");
});
DeleteInLast.addEventListener('click', function () {
    myArray.pop();
    showArray.textContent = "Array = [".concat(myArray, "]");
});
// Sorting
Sort.addEventListener('click', function () {
    myArray.sort();
    showArray.textContent = "Array = [".concat(myArray, "]");
});
// Reverse
Reverse.addEventListener('click', function () {
    myArray.reverse();
    showArray.textContent = "Array = [".concat(myArray, "]");
});
