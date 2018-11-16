listDiv.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'down'){
    let li = event.target.parentNode;
    let downElement = li.querySelector('button.down')
    addBeforeURL.textContent = addBeforeURL.value 
    downElement.innerHTML = `<img src="${img1}" height="42" width="42"/>`
    {let lb = document.createElement('button')
    li.appendChild(lb)
    lb.className = 'up'
    lb.innerText = 'ADD AFTER IMAGE'
    let removeElement = li.querySelector('button.remove')
    li.removeChild(removeElement)  
    li.style.background='yellow'
    }
  }
}});