var userValue = document.querySelector("#userValue");
var showArray = document.querySelector("#showArray");
var showTotal = document.querySelector("#showTotal");
var AddInFirst = document.querySelector("#AddInFirst");
var AddInLast = document.querySelector("#AddInLast");
var DeleteInFirst = document.querySelector("#DeleteInFirst");
var DeleteInLast = document.querySelector("#DeleteInLast");
var Sort = document.querySelector("#Sort");
var Reverse = document.querySelector("#Reverse");
var sum = document.querySelector("#sum");
// Array
var myArray = [];
showArray.textContent = "Array [".concat(myArray, "]");
var Calculation = /** @class */ (function () {
    function Calculation() {
    }
    Calculation.prototype.Add1st = function () {
        myArray.unshift(Number(userValue.value));
        showArray.textContent = "Array [".concat(myArray, "]");
        userValue.value = "";
        userValue.focus();
    };
    Calculation.prototype.AddLast = function () {
        myArray.push(Number(userValue.value));
        showArray.textContent = "Array [".concat(myArray, "]");
        userValue.value = "";
        userValue.focus();
    };
    Calculation.prototype.Delete1st = function () {
        myArray.shift();
        showArray.textContent = "Array [".concat(myArray, "]");
    };
    Calculation.prototype.DeleteLast = function () {
        myArray.pop();
        showArray.textContent = "Array [".concat(myArray, "]");
    };
    Calculation.prototype.sort = function () {
        myArray.sort(function (a, b) {
            return a - b;
        });
        showArray.textContent = "Array [".concat(myArray, "]");
    };
    Calculation.prototype.reverse = function () {
        myArray.reverse();
        showArray.textContent = "Array [".concat(myArray, "]");
    };
    Calculation.prototype.sum = function () {
        var Total = myArray.reduce(function (acc, elem) {
            return acc += elem;
        });
        showTotal.textContent = "Total is ".concat(Total);
    };
    return Calculation;
}());
var obj = new Calculation();
AddInFirst.addEventListener('click', obj.Add1st);
AddInLast.addEventListener('click', obj.AddLast);
DeleteInFirst.addEventListener('click', obj.Delete1st);
DeleteInLast.addEventListener('click', obj.DeleteLast);
Sort.addEventListener('click', obj.sort);
Reverse.addEventListener('click', obj.reverse);
sum.addEventListener('click', obj.sum);
