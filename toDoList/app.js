const inputAdd = document.getElementById("input_add");
const inputAddButton = document.getElementById("input_add__button");
const todos = document.getElementById("todos");
const todoEventInfo_2 = document.getElementsByClassName("todo_event_info");
const eventSideBar = document.getElementById('eventSideBar');

eventListener();

function eventListener() {
  inputAdd.addEventListener("keyup", addTodo);
  inputAddButton.addEventListener("click", addTodo);
  todos.addEventListener("click", deleteTodo);
  todos.addEventListener("click",updateTodo);
 
}

function addTodo(event) {
  if (
    (event.keyCode == 13 || event.type == "click") &&inputAdd.value.trim() !== "") {


    todoInputContent = event.target.value ? event.target.value : inputAdd.value;

    let todo = createTodo(todoInputContent);

    todos.appendChild(todo);

    event.target.value = "";
    inputAdd.value = "";

    let eventType = "success";

    todoEventInfo(eventType);

    addTodoToLocalStorage(todoInputContent);

  } else if (
    inputAdd.value.trim() == "" &&
    (event.keyCode == 13 || event.type == "click")
  ) {
    noticeInput();
  } else {
    let writing = true;
  }
  let writing = false;
}

function createTodo(todoInputContent) {
  let todo, todoContent, todoInput, todoButton;

  todo = document.createElement("div");
  todo.className = "todo";

  todoContent = document.createElement("div");
  todoContent.className = "todo-content";

  todoInput = document.createElement("input");
  todoInput.className = 'todoInput';
  todoInput.value = todoInputContent;

  todoButton = document.createElement("button");
  todoButton.innerHTML = "Delete";
  todoButton.className = "deleteButton";

  todoContent.append(todoInput);
  todo.appendChild(todoContent);
  todo.appendChild(todoButton);

  return todo;
}

function deleteTodo(event) {
  if (event.target.className == "deleteButton") {
    let todo;
    todo = event.target.parentElement;
    todo.remove();

    let eventType = "warning";
    todoEventInfo(eventType);
    deleteTodoFromLocalStorage(todo);
  }
}

function updateTodo(event){
  if(event.target.className = 'todoInput') {
      event.target.addEventListener('keyup',function(event){
        if(event.keyCode == 13){
            let todoInput = event.target.value;

            updateTodoFromLocalStorage(todoInput);
        }
      })
  }
}

// NOTİCE
function noticeInput() {
  inputAdd.style.backgroundColor = "rgb(241, 53, 53)";
  inputAdd.style.boxShadow = "0px 0px 6px 1px rgb(241, 53, 53)";
  setTimeout(() => {
    inputAdd.style.backgroundColor = "#FFFFFF";
    inputAdd.style.boxShadow = "none";
  }, 1000);
}

function todoEventInfo(eventType) {
  if (eventType == "success") {
    let todoEvent = createTodoEventInfo(eventType);
    eventSideBar.appendChild(todoEvent);
   
  } else {
    let todoEvent = createTodoEventInfo(eventType);
    eventSideBar.appendChild(todoEvent);
  }
  let todoEvent = Array.from(todoEventInfo_2);
  todoEvent.forEach(function(div){
    div.addEventListener('animationend',deleteTodoEventInfo);
  })
}
function deleteTodoEventInfo(e){
  setTimeout(function(){
   e.target.remove()
  },6000)
}

function createTodoEventInfo(type){

  let info = type == 'success' ? 'Added Sucess' : 'Delete Success';
  let todoEvent = document.createElement('div');
  todoEvent.className = 'todo_event_info' + ' ' +  type;
  let todoEventContent = document.createElement('div');
  todoEventContent.className ='content';
  todoEventContent.innerHTML = info;
  todoEvent.appendChild(todoEventContent)
  return todoEvent;

}
// localStorage
function addTodoToLocalStorage(todo) {
  let todosStorage;
  if (localStorage.getItem("todos") == null) {
    todosStorage = [];
  } else {
    todosStorage = JSON.parse(localStorage.getItem("todos"));
  }
  todosStorage.push(todo);

  localStorage.setItem("todos", JSON.stringify(todosStorage));
}

function deleteTodoFromLocalStorage(todo) {
  let todos,todoNew;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoNew = todo;
  let todoIndex = todoNew.children[0].children[0].value;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoFromLocalStorage(todo) {
console.log('güncellendi');
}
function getTodoFromLocalStorage(todo) {
  let todoList;
  if (localStorage.getItem("todos") == null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todos"));
  }
  todoList.forEach(function (todoValue) {
  let todo;
  todo = createTodo(todoValue)
  todos.appendChild(todo);
  });
}

getTodoFromLocalStorage();
