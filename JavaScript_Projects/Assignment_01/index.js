// get button Elements
let addIn1st = document.getElementById("addIn1st");
let addInLast = document.getElementById("addInLast");
let delete1st = document.getElementById("delete1st");
let deleteLast = document.getElementById("deleteLast");
let sort = document.getElementById("sort");
let reverse = document.getElementById("reverse");
let search = document.getElementById("search");
// showArray
let showArray = document.getElementById("showArray");

// get input values
let userInput = document.getElementById("userInput");
let userSearch = document.getElementById("userSearch");

// create Array
let myArray = ["red","green","blue"];
showArray.innerHTML = `Array = [${myArray}]`;

class MyColor{
    addIn1st(){
        if(userInput.value != ""){
            myArray.unshift(userInput.value.toLowerCase());
            showArray.innerHTML = `Array = [${myArray}]`;
            userInput.value = "";
            userInput.focus();
        }else{
            alert("Please Enter a color name!");
        }
    }
    addInLast(){
        if(userInput.value != ""){
            myArray.push(userInput.value.toLowerCase());
            showArray.innerHTML = `Array = [${myArray}]`;
            userInput.value = "";
            userInput.focus();
        }else{
            alert("Please Enter a color name!");
        }
    }
    delete1st(){
        myArray.shift();
        showArray.innerHTML = `Array = [${myArray}]`;
    }
    deleteLast(){
        myArray.pop();
        showArray.innerHTML = `Array = [${myArray}]`;
    }
    sort(){
        myArray.sort();
        showArray.innerHTML = `Array = [${myArray}]`;
    }
    reverse(){
        myArray.reverse();
        showArray.innerHTML = `Array = [${myArray}]`;
    }
    search(){
        let position = myArray.indexOf(userSearch.value.toLowerCase());
        if(position > -1){
            alert("Successfuly Found!");
        }else{
            alert("Not Found!");
        }
        userSearch.value = "";
        userSearch.focus();
    }
}

// creating Object for class
let myColor = new MyColor();
// calling Methods 
addIn1st.addEventListener('click',myColor.addIn1st);
addInLast.addEventListener('click',myColor.addInLast);
delete1st.addEventListener('click',myColor.delete1st);
deleteLast.addEventListener('click',myColor.deleteLast);
sort.addEventListener('click',myColor.sort);
reverse.addEventListener('click',myColor.reverse);
search.addEventListener('click',myColor.search);


