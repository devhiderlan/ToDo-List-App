let form = document.querySelector('form')
let text = document.getElementById('text')
let todoCon = document.querySelector('.todo-con')

form.addEventListener('submit', e => {
  e.preventDefault()
  addTodo()

})

let todos = JSON.parse(localStorage.getItem('todos'))
if (todos) {
  todos.forEach(element => {
    addTodo(element)
  })
}

function addTodo(elem) {
  let todoCollection = document.createElement('div')
  todoCollection.classList.add('todoColl')
  let todoText = text.value
  if (elem) {
    todoText = elem.text
  }

  if (todoText) {
    todoCollection.innerHTML = `
  <div class="todo-li">
    <div class="check ${elem && elem.complete ? 'active-check' : ''}">
      <img src="./images/icon-check.svg" alt="icon check" />
    </div>
    <p class="ptag ${elem && elem.complete ? 'complete' : ''}">${todoText}</p>
    <button class="close">
      <img src="./images/icon-cross.svg" alt="" />
    </button>
  </div>
  <div class="hr"></div>
  `
    todoCon.appendChild(todoCollection)
    updateLocalStorage()
  }

  let close = todoCollection.querySelector('.close')
  close.addEventListener('click', () => {
    todoCollection.remove()
    updateLocalStorage()
  })

  let check = todoCollection.querySelector('.check')
  check.addEventListener('click', () => {
    check.classList.toggle('active-check')
    todoCollection.children[0].children[1].classList.add('complete')
    updateLocalStorage()
  })

  text.value = ''
}

function updateLocalStorage() {
  let ptag = document.querySelectorAll('.ptag')
  let arr = []
  ptag.forEach(element => {
    arr.push({
      text: element.innerText,
      complete: element.classList.contains('complete')
    })
  })
  localStorage.setItem('todos', JSON.stringify(arr))
}

let info = document.querySelectorAll('.choice p')
let todoLi = document.querySelectorAll('.todoColl')
console.log(info)
info.forEach(element => {
  element.addEventListener('click', () => {
    info.forEach(item => {
      item.classList.remove('active')
    })
    element.classList.add('active')
    if (element.innerText == 'Active') {
      todoLi.forEach(elem => {
        if (!elem.children[0].children[1].classList.contains('complete')) {
          elem.style.display = 'block'
        } else {
          elem.style.display = 'none'
        }
      })
    } else if (element.innerText == 'Completed') {
      todoLi.forEach(elem => {
        if (elem.children[0].children[1].classList.contains('complete')) {
          elem.style.display = 'block'
        } else {
          elem.style.display = 'none'
        }
      })
    } else {
      todoLi.forEach(elem => {
        elem.style.display = 'block'
      })
    }
  })
})

let clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
  todoLi.forEach(elem => {
    if (elem.children[0].children[1].classList.contains('complete')) {
      elem.remove()
      updateLocalStorage()
    }
  })
})

let left = document.querySelector('.left')
function setitem() {
  let activeTodo = document.querySelectorAll('.todo-li .active-check')
  let diff = todoLi.length - activeTodo.length
  left.innerText = `${diff} items left`
}

setitem()
