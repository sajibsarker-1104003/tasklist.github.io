//Definng UI Element//
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');


//Defining Event Listener//
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);//Eventlistener of Remove Function//
//Define Function//
clearBtn.addEventListener('click', clearTask);//Clear Task EventLisener// 
filter.addEventListener('keyup', filterTask);//Filter Event Listener//
document.addEventListener('DOMContentLoaded', getTasks);//After Loading, Local Storage Will Be Seen In This Page For This listener//
function addTask(e) {

  if (taskInput.value === '') {
    alert('Add a Task');
  } else {
    //Tasks In li Element//
    let li = document.createElement('li');

    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
    //Added local Storage Function//
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}
//Define Remove Function//
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you Sure??")) {
      let ele = e.target.parentElement;
      ele.remove();
      //Adding removeFromLS Function//
      removeFromLS(ele);//function defining of removeFromLS//
    }
  }
}
//defining Clear Task Function//
function clearTask(e) {
  taskList.innerHTML = "";
  localStorage.clear();
}
//Another way of Defining Task Function//
/*function clearTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}*/
//Difining Filter Function//
function filterTask(e) {
  let text = e.target.value.toLowerCase();//User Input In Filter Stored//
  document.querySelectorAll('li').forEach(task => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });//Item Filtering//

}

//Local Storage Add=>go to Add Task Function and Added After taskList.appendChild(li)//
//Function Defining Of local Storage//
function storeTaskInLocalStorage(task) {
  let tasks;//All Task Will Be Include//
  if (localStorage.getItem('tasks') === null) {
    tasks = [];//Checking local Storage If Tasks Exist Or Not//
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.push(task);//Adding Task Will Be Pushed//
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//After Loading, Local Storage Will Be Seen In This Page//
//Add New Document Event Listener//
//Defining Function of Document Get Tasks//
function getTasks() {
  let tasks;//All Task Will Be Include//
  if (localStorage.getItem('tasks') === null) {
    tasks = [];//Checking local Storage If Tasks Exist Or Not//
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.forEach(task => {
    //Tasks In li Element Part Copying//
    let li = document.createElement('li');

    li.appendChild(document.createTextNode(task + " "));//taskList.value Modifed by task//
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
  });

}

//Permanentaly Deleting From Local Storage//

//Defining Local Storage Removing Function//
function removeFromLS(taskItem) {
  //Copy Get Task Function//
  let tasks;//All Task Will Be Include//
  if (localStorage.getItem('tasks') === null) {
    tasks = [];//Checking local Storage If Tasks Exist Or Not//
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  let li = taskItem;
  li.removeChild(li.lastChild);//<a>x</a>
  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Last Part//
//go to clearTask Function//
/*
localStorage.clear();*/