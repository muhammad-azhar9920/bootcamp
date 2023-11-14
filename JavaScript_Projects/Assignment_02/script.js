let title = document.querySelector("input");
let desc = document.querySelector("textarea");
let add = document.querySelector("#add");
let remove = document.querySelector("#remove");
let showData = document.querySelector(".showData");
let h5;
let p;
let col;
/// Add Title & Description
add.addEventListener('click',()=>{
    if(title.value != "" && desc.value  != ""){
    // create h5 and p 
    h5 = document.createElement("h5");
    h5.appendChild(document.createTextNode(title.value));
    p = document.createElement("p");
    p.appendChild(document.createTextNode(desc.value));

    // create 2 div for card
    let div1 = document.createElement("div");
    div1.setAttribute("class","card my-2");
    let div2 = document.createElement("div");
    div2.setAttribute("class","card-body");

    div2.appendChild(h5);
    div2.appendChild(p);
    div1.appendChild(div2);

    // create column
    col = document.createElement("col");
    col.setAttribute("class","col");
    col.appendChild(div1);

    showData.appendChild(col);
    }else{
        alert("Please write title or description!");
    }
    title.value = "";
    desc.value = "";
    desc.focus();
    title.focus();
})

remove.addEventListener('click',()=>{
    // showData.removeChild(col);
    showData.remove();
})