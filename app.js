const addDateTextInputEl = document.querySelector('input.addDateTextInput');
const addTimeTextInputEl = document.querySelector('input.addTimeTextInput');
const addItemTextInputEl = document.querySelector('input.addItemTextInput');
const addLocationTextInputEl = document.querySelector('input.addLocationTextInput');
const beforeImageInputEl = document.querySelector('input.beforeImageTextInput');
const afterImageInputEl = document.querySelector('input.afterImageTextInput');
const addItemButtonEl = document.querySelector('button.addItemButton');
const listDivEl = document.querySelector('.list');



const postTaskUrl = `http://localhost:3000/api/v1/tasks`
const fetchTasks = () => fetch(postTaskUrl).then(resp=>resp.json())//.then(resp=> arr = [...resp])
document.addEventListener('DOMContentLoaded', ()=>{
    fetchTasks().then( (tasksData) => renderAllTasks(tasksData))
})

const renderTask = (taskData) => {
  //LOAD TASK FROM SERVER
  let listEl = document.getElementsByTagName('ul')[0];
  let listItemEl = document.createElement('li');
  addDateTextInputEl.value = taskData.date;
  addTimeTextInputEl.value = taskData.time;
  addItemTextInputEl.value = taskData.title
  addLocationTextInputEl.value = taskData.location
  listItemEl.innerHTML = addDateTextInputEl.value+'---'+ addTimeTextInputEl.value+'---'+addItemTextInputEl.value +'---'+addLocationTextInputEl.value
  listEl.appendChild(listItemEl);
  //ADD BEFORE INPUT
  let beforeImageButtonEl = document.createElement('button')
  beforeImageButtonEl.type='file'
  beforeImageButtonEl.className='button'
  beforeImageInputEl.innerText='Hello'
  listItemEl.appendChild(beforeImageButtonEl)
  beforeImageButtonEl.className = 'down'
  beforeImageButtonEl.innerText = 'ADD BEFORE IMAGE'
  //ADD REMOVE BUTTON
  let removeTaskButtonEl = document.createElement('button')
  listItemEl.appendChild(removeTaskButtonEl)
  removeTaskButtonEl.className = 'remove'
  removeTaskButtonEl.setAttribute('data-id',taskData.id)
  removeTaskButtonEl.innerText = 'X'
  //CLEAR INPUTS ON ENTRY FORM
  addDateTextInputEl.value = '';
  addTimeTextInputEl.value = '';
  addItemTextInputEl.value = ''
  addLocationTextInputEl.value = ''
}

//TASKS
//ADD NEW TASK TO SERVER
const addTaskToServer = () => fetch(postTaskUrl,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    user_id:'1',
    date:`${addDateTextInputEl.value}`,
    time:`${addTimeTextInputEl.value}`,
    title:`${addItemTextInputEl.value}`,
    location:`${addLocationTextInputEl.value}`,
    beforeImage:`${beforeImageInputEl.value}`,
    afterImage:`${afterImageInputEl.value}`
    })}).then(resp=>resp.json()).then(resp=>console.log(resp))

//REMOVE TASK FROM SERVER
    const removeTaskFromServer = (dataId) => {
    return fetch(`${postTaskUrl}/${dataId}`, {
      method: "DELETE",
    })
    .then(res => res.json())
  }
 
const renderAllTasks = (tasks)=> tasks.forEach(task => renderTask(task))


//EVENT LISTENERS
//POST TASKS TO SERVER AND RENDER ALL TASKS
    addItemButtonEl.addEventListener('click', () => {
        addTaskToServer().then((newTask) => renderTask(newTask))
    });


// REMOVE TASK ITEM
    listDivEl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.className == 'remove'){
        let listEl = event.target.parentNode;
        let listDivEl = listEl.parentNode;
        listDivEl.removeChild(listEl)
        const id = parseInt(event.target.dataset.id)
        removeTaskFromServer(id)
        }
    }
    });

// MARK TASK AS WORK IN PROCESS, HIDE BEFORE IMAGE BUTTON, SHOW AFTER IMAGE BUTTON, REMOVE DELETE BUTTON

    listDivEl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {

    //SET BEFORE IMAGE
    if (event.target.className == 'down'){
    let listEl = event.target.parentNode;
    let beforePictureEl = listEl.querySelector('button.down') 
    beforePictureEl.innerHTML = `<img src="${taskData.beforeImage}" height="42" width="42"/>`
    if (beforePictureEl.src!=""){
    listEl.style.background='yellow'}

    //SHOW AFTER IMAGE BUTTON
    let afterImageButtonEl = document.createElement('button')
    listEl.appendChild(afterImageButtonEl)
    afterImageButtonEl.className = 'up'
    afterImageButtonEl.innerText = 'ADD AFTER IMAGE'

    //REMOVE DELETE BUTTON ELEMENT 
    let removeDeleteButtonEl = listEl.querySelector('button.remove')
    listEl.removeChild(removeDeleteButtonEl)  
    }
    }
  
});

listDivEl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'up'){
    let listEl = event.target.parentNode;
    let afterImageButtonEl = listEl.querySelector('button.up')
    afterImageButtonEl.innerHTML = `<img src="${taskData.afterImage}" height="42" width="42"/>` 
    if (afterImageButtonEl.src!=""){
    listEl.style.background='green'}
    }
  }
});

let img1 = `https://icon2.kisspng.com/20180404/jww/kisspng-world-emoji-day-whatsapp-emoticon-crying-sad-emoji-5ac49e122a6e38.5636445015228349621738.jpg`
  
let img =`https://icon2.kisspng.com/20180404/jww/kisspng-world-emoji-day-whatsapp-emoticon-crying-sad-emoji-5ac49e122a6e38.5636445015228349621738.jpg`