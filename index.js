let myLeads = [];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tab = [
    {url : "https://www.linkedln.com/Abiola-Zeenat"}
]

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}
deleteBtn.addEventListener("dblclick",function () {
    localStorage.clear()
    myLeads = []
    renderLeads()
    
})

tabBtn.addEventListener("click",function () {
    chrome.tabs.query({active:true, currentWindow:true},function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads ))
        renderLeads()
    })
   

})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value =""
    localStorage.setItem("myLeads", JSON.stringify(myLeads ))
    renderLeads();
        
// JSON.parse(value)- used to turn a string to an array
// JSON.stringify(value) - used to turn an array into a string


}) 
function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        const element = myLeads[i];
        listItems += `
        <li>
            <a href = " ${element} " target = '_blank'>
                ${element} 
            </a>
        </li>
        `
        
    
        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }
    ulEl.innerHTML = listItems;
 
}