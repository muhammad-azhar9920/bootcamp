// get Elements for user Input
let userInput = document.getElementById("userInput");
let userSearch = document.getElementById("userSearch");

// get Elements for buttons
let addIn1st = document.getElementById("addIn1st");
let addInLast = document.getElementById("addInLast");
let delete1st = document.getElementById("delete1st");
let deleteLast = document.getElementById("deleteLast");
let sort = document.getElementById("sort");
let reverse = document.getElementById("reverse");
let search = document.getElementById("search");
// get Element for show Array
let showArr = document.getElementById("showArr");

////////////// Array ///////////
let myArr = [1,2,3];
showArr.innerHTML = `Array = [${myArr}]`;

// Class for Array Methods
class MyClass{
        addIn1st(){
            if(userInput.value != ""){
                myArr.unshift(userInput.value);
                showArr.innerHTML = `Array = [${myArr}]`;
                userInput.value = "";
                userInput.focus();
            }else{
                alert("Please give Value!");
            }
        }
        addInLast(){
            if(userInput.value != ""){
                myArr.push(userInput.value);
                showArr.innerHTML = `Array = [${myArr}]`;
                userInput.value = "";
                userInput.focus();
            }else{
                alert("Please give Value!");
            }
        }
        delete1st(){
                myArr.shift();
                showArr.innerHTML = `Array = [${myArr}]`;
        }
        deleteLast(){
                myArr.pop();
                showArr.innerHTML = `Array = [${myArr}]`;
        }
        sort(){
                myArr.sort((a,b)=>{
                    return a-b;
                });
                showArr.innerHTML = `Array = [${myArr}]`;
        }
        reverse(){
                myArr.reverse();
                showArr.innerHTML = `Array = [${myArr}]`;
        }
        search(){
                let val;
                for(let i=0; i<myArr.length; i++){
                    val = myArr[i];
                    if(userSearch.value == val){
                        alert("Value Successfully Found");
                        break;
                    }
                }
                if(userSearch.value != val){
                    alert("Value not Found!");
                }
                userSearch.value = "";
                userSearch.focus();
        }
}

let obj = new MyClass();
// Call the Methods
addIn1st.addEventListener('click',obj.addIn1st);
addInLast.addEventListener('click',obj.addInLast);
delete1st.addEventListener('click',obj.delete1st);
deleteLast.addEventListener('click',obj.deleteLast);
sort.addEventListener('click',obj.sort);
reverse.addEventListener('click',obj.reverse);
search.addEventListener('click',obj.search);    

