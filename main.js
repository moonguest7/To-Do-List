// buttons
const addItemButton = document.getElementById('add-item');
const clearList = document.getElementById('clear-items');


// event listeners
document.addEventListener('DOMContentLoaded', getItems);
addItemButton.addEventListener('click', addItem);
clearList.addEventListener('click', clearItems)


// functions 
function addItem() {
    // adds todo item if user input isn't empty
    const userInput = document.getElementById('user-input').value;
    if (userInput !== "") {
        const newItem = document.createElement('div');
        newItem.setAttribute('id', 'list-item-container');
        const firstDivItem = document.createElement('li');
        firstDivItem.setAttribute('id', 'first-div-item');
        newItem.appendChild(firstDivItem);
        const itemText = document.createTextNode(userInput);
        firstDivItem.appendChild(itemText);
        document.getElementById('items').appendChild(newItem);
        saveToLocal(userInput);

        // adds delete button next to todo item
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete-item');
        deleteButton.addEventListener('click', function() {
            newItem.remove();
            removeFromLocal(newItem);
        });
        const buttonText = document.createTextNode('-');
        deleteButton.appendChild(buttonText);
        newItem.appendChild(deleteButton);
        document.getElementById('user-input').value = '';
    } else {
        alert('Enter an item please.')
    }
}


// remove todo item from local storage
function removeFromLocal(todo) {
    let toDoList;
    if(localStorage.getItem('toDoList') === null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
    }
    const toDoIndex = todo.children[0].innerText;
    toDoList.splice(toDoList.indexOf(toDoIndex), 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}


// saves todo item to local storage if not already there
function saveToLocal(listItem) {
    let toDoList;
    if(localStorage.getItem('toDoList') === null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
    }
    toDoList.push(listItem);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}


// removes all todo items 
function clearItems() {
    let parentEl = document.getElementById('items');
    while (parentEl.firstChild) {
        parentEl.removeChild(parentEl.firstChild);
    }
    if(localStorage.getItem('toDoList') !== null) {
        localStorage.removeItem('toDoList');
    }
}


// displays todo items after page refresh
function getItems() {
    let toDoList;
    if(localStorage.getItem('toDoList') === null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
    }
    toDoList.forEach(function(element) {
        // adds todo item 
        const newItem = document.createElement('div');
        newItem.setAttribute('id', 'list-item-container');
        const firstDivItem = document.createElement('li');
        firstDivItem.setAttribute('id', 'first-div-item');
        newItem.appendChild(firstDivItem);
        const itemText = document.createTextNode(element);
        firstDivItem.appendChild(itemText);
        document.getElementById('items').appendChild(newItem);

        // adds delete button next to todo item 
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete-item');
        deleteButton.addEventListener('click', function() {
            newItem.remove();
            removeFromLocal(newItem);
        });
        const buttonText = document.createTextNode('-');
        deleteButton.appendChild(buttonText);
        newItem.appendChild(deleteButton);
    })
}
