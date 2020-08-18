/* clock */
class Clock {
    constructor({ template }) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        return output;
    }
}
/* main */

let btn = document.querySelector('.todoBtn');
let input = document.querySelector('.todoInput');
let todoList = document.querySelector('#todoListContainer');
let alert = document.querySelector('.alert');
todoList.innerHTML = (localStorage.getItem(1)) ? render(JSON.parse(localStorage.getItem(1))) : '';
let arr = (localStorage.getItem(1)) ? JSON.parse(localStorage.getItem(1)) : [];
let deleteItem = document.querySelectorAll('.delete');
let listItem = document.querySelectorAll('.listItem');

let clock = new Clock({template : 'h:m:s'});

listiner();

function setoverflow() {
    listItem = document.querySelectorAll('.listItem');
    listItem.forEach(el => {
        if (el.offsetHeight > 399) {
            el.classList.add('large');
        }
    });
}
setoverflow();

function addelement() {
    let obj = {
        id: arr.length,
        value: input.value,
        time: `${clock.render()}`
    }

    console.log(input.value);
    if (obj.value == '' || obj.value == '\n') {
        alert.innerHTML = "Enter something, please!";
        input.value = null;
        setTimeout(() => { alert.innerHTML = '' }, 2000);
        return 0;
    }
    else if (obj.value != '' && obj.value != '\n') {
        arr.push(obj);
        push();
    }

    input.value = null;
    todoList.innerHTML = render(JSON.parse(localStorage.getItem(1)), 'a', 'animate__slideInDown');
    listItem = document.querySelectorAll('.listItem');
    setoverflow();

    listItem.forEach(el => {
        if (el.offsetHeight > 599) {
            el.classList.add('large');
        }
        if (el.id == arr.length - 1) {
            el.classList.remove('animate__slideInUp', 'animate__slideInDown');
            el.classList.add('animate__fadeInDown');
        };
    });


    deleteItem = document.querySelectorAll('.delete');
    listiner();
}

function render(arr, id = undefined, anim) {
    let key = 0;
    return arr.map((el) => {
        let animate = anim || 'animate__slideInUp';
        if (el.id >= id) { animate = '' }
        let str = `<div class='listItem wow animate__faster animate__animated ${animate}' id=${el.id}>
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
    if (event.shiftKey && (event.key == 'Enter')) {
    }
    else if (event.key == 'Enter') {
        addelement();
    }
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


    el.parentNode.parentNode.classList.remove('animate__fadeInDown', 'animate__slideInUp', 'animate__slideInDown');
    el.parentNode.parentNode.classList.add('animate__fadeOutLeft');
    setTimeout(() => {
        push();
        arr = (localStorage.getItem(1)) ? JSON.parse(localStorage.getItem(1)) : [];
        removelistiner();

        todoList.innerHTML = render(JSON.parse(localStorage.getItem(1)), el.parentNode.parentNode.id);
        setoverflow();
        deleteItem = document.querySelectorAll('.delete');
        listiner();
    }, 200);
}

