import {v4 as uuid} from 'uuid' 

let form = document.querySelector<HTMLFormElement>("#todoForm");
let inputEl = document.getElementById("taskInput") as HTMLInputElement|null
let tasklist = document.querySelector<HTMLUListElement>(".list");
console.log(form,inputEl)



type TaskType={
  name:string,
  id:string,
  completed:boolean,
  createdAt:Date
}
let lsTasksJson = localStorage.getItem("todo-tasks");
let lsTasks: TaskType[] = lsTasksJson ? JSON.parse(lsTasksJson) : [];
displayTasks(lsTasks);

form?.addEventListener("submit",e=>{


  
  e.preventDefault();
  
  if(inputEl?.value==""||inputEl?.value==null) return;

  console.log(inputEl.value)

  const task:TaskType = {
   name:inputEl.value,
   id:uuid(),
   completed:false,
   createdAt:new Date()
  }

  addNewTask(task);
  inputEl.value=""

})


function addNewTask(task:TaskType){
  
  const newtask = document.createElement('li');
  newtask.innerText = task.name;
  newtask.setAttribute("data-id",`${task.id}`)

  newtask.addEventListener('click',completeTask)

  tasklist?.append(newtask);

  lsTasks.push(task);
  console.log(lsTasks)
  localStorage.setItem('todo-tasks',JSON.stringify(lsTasks));

}

function completeTask(e: MouseEvent) {
  const target = e.target as HTMLElement;

  const targetID = target.attributes[0].nodeValue
  let targetTask = lsTasks.find((item)=>{
    return item.id ===targetID
  })


  console.log(targetTask)
  if(targetTask!=undefined && targetTask.completed===false){

    targetTask.completed = true;
    target.style.textDecoration="line-through"
    target.style.opacity="0.4"
  }else if(targetTask!=undefined && targetTask.completed===true){
    //here target task will already be completed, so we have to delete it
    lsTasks.splice(lsTasks.indexOf(targetTask),1)
    localStorage.setItem("todo-tasks",JSON.stringify(lsTasks));
    displayTasks(lsTasks)
    console.log(lsTasks)
  }

  


}
function displayTasks(tasks:TaskType[]){
  if(tasklist){tasklist.innerHTML = ""}
  tasks.map((task)=>{
  const newtask = document.createElement('li');
  newtask.innerText = task.name;
    newtask.setAttribute("data-id",`${task.id}`)
  newtask.addEventListener('click',completeTask)

  tasklist?.append(newtask);
  })
}