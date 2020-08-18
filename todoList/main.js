let btn = document.querySelector('.todoBtn');
let input = document.querySelector('.todoInput');
let todoList = document.querySelector('#todoListContainer');

todoList.innerHTML = (localStorage.getItem(1)) ? render(JSON.parse(localStorage.getItem(1))) : '';
let arr = (localStorage.getItem(1)) ? JSON.parse(localStorage.getItem(1)) : [];
let deleteItem = document.querySelectorAll('.delete');

listiner();


function addelement() {
    let obj = {
        id: arr.length,
        value: input.value,
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    }
    if (obj.value != '' && obj.value != '\n') {
        arr.push(obj);
        push();
    }
    input.value = '';
    todoList.innerHTML = render(JSON.parse(localStorage.getItem(1)));

    deleteItem = document.querySelectorAll('.delete');
    listiner();
}

function render(arr) {
    let key = 0;
    return arr.map((el) => {
        let str = `<div class='listItem' key=${el.id}>
        <div class="wrapper">
        <span>${el.time}</span>
        <span class='delete' key=${key}>&#10006;</span></div>
        <span class="todo">${el.value}</span>
        </div>`;
        key++;
        return str;
    }).reverse().join("");
};

function push() {
    let json = JSON.stringify(arr);
    localStorage.setItem(1, json);
};






btn.addEventListener("click", () => {
    addelement();
});

input.addEventListener('keydown', event => {
    if (event.key === 'Enter') addelement();
})

function removelistiner() {
    deleteItem.forEach((el) => {
        el.removeEventListener('click', (event) => {

            deleteListItem(event.target)
        });
    })
};

function listiner() {
    deleteItem.forEach((el) => {
        el.addEventListener('click', (event) => {
            console.log(event.target)
            deleteListItem(event.target)
        });
    })
};

function deleteListItem(el) {
    let key = 0;
    arr.splice(el.getAttribute("key"), 1);
    arr = arr.map((el) => {
        let obj = {
            id: key,
            value: el.value,
            time: el.time
        }
        key++;
        return obj;
    });
    push();

    arr = (localStorage.getItem(1)) ? JSON.parse(localStorage.getItem(1)) : [];
    removelistiner();

    todoList.innerHTML = render(JSON.parse(localStorage.getItem(1)));

    deleteItem = document.querySelectorAll('.delete');
    listiner();
}

