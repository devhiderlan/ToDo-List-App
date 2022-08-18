let form = document.querySelector('form')
let text = document.getElementById('text')
let todoCon = document.querySelector('.todo-con')

form.addEventListener('submit', e => {
  e.preventDefault()
  addTodo()
})

function addTodo() {
  let todoCollection = document.createElement('div')
  let todoText = text.value
  todoCollection.innerHTML = `
  <div class="todo-li">
    <div class="check">
      <img src="./images/icon-check.svg" alt="icon check" />
    </div>
    <p>${todoText}</p>
    <button class="close">
      <img src="./images/icon-cross.svg" alt="" />
    </button>
  </div>
  <div class="hr"></div>
  `

  todoCon.appendChild(todoCollection)

  let close = todoCollection.querySelector('.close')
  close.addEventListener('click', () => {
    todoCollection.remove()
  })

  let check = todoCollection.querySelector('.check')
  check.addEventListener('click', () => {
    check.classList.toggle('active-check')
    todoCollection.children[0].children[1].classList.add('complete')
  })
}
