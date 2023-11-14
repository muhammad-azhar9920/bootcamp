let userValue = document.querySelector("#userValue") as HTMLInputElement;
let showArray = document.querySelector("#showArray") as HTMLDivElement;
let showTotal = document.querySelector("#showTotal") as HTMLDivElement;
let AddInFirst = document.querySelector("#AddInFirst") as HTMLButtonElement;
let AddInLast = document.querySelector("#AddInLast") as HTMLButtonElement;
let DeleteInFirst = document.querySelector("#DeleteInFirst") as HTMLButtonElement;
let DeleteInLast = document.querySelector("#DeleteInLast") as HTMLButtonElement;
let Sort = document.querySelector("#Sort") as HTMLButtonElement;
let Reverse = document.querySelector("#Reverse") as HTMLButtonElement;
let sum = document.querySelector("#sum") as HTMLButtonElement;

// Array
const myArray:number [] = [];
showArray.textContent = `Array [${myArray}]`;

class Calculation{
    Add1st(){
        myArray.unshift(Number(userValue.value));
        showArray.textContent = `Array [${myArray}]`;
        userValue.value = "";
        userValue.focus();
    }
    AddLast(){
        myArray.push(Number(userValue.value));
        showArray.textContent = `Array [${myArray}]`;
        userValue.value = "";
        userValue.focus();
    }
    Delete1st(){
        myArray.shift();
        showArray.textContent = `Array [${myArray}]`;
    }
    DeleteLast(){
        myArray.pop();
        showArray.textContent = `Array [${myArray}]`;
    }
    sort(){
        myArray.sort((a:number,b:number):number=>{
            return a-b;
        });
        showArray.textContent = `Array [${myArray}]`;
    }
    reverse(){
        myArray.reverse();
        showArray.textContent = `Array [${myArray}]`;
    }
    sum(){
        let Total:number = myArray.reduce((acc:number,elem:number):number =>{
            return acc += elem;
        });
        showTotal.textContent = `Total is ${Total}`;
    }
}

const obj = new Calculation();
AddInFirst.addEventListener('click',obj.Add1st);
AddInLast.addEventListener('click',obj.AddLast);
DeleteInFirst.addEventListener('click',obj.Delete1st);
DeleteInLast.addEventListener('click',obj.DeleteLast);
Sort.addEventListener('click',obj.sort);
Reverse.addEventListener('click',obj.reverse);
sum.addEventListener('click',obj.sum);