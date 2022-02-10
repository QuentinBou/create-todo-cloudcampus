import { CreateList, CreateTask, checkStorage } from "./utils.js";


const newList = document.getElementById('newList')
const newListButton = document.getElementById('add')

window.addEventListener('load', checkStorage)


newList.addEventListener('input', e => {
    newList.setAttribute('value', e.target.value)
})

newListButton.addEventListener('click', () => {
    if(newList.getAttribute('value') != ""){
        let list = new CreateList(newList.getAttribute('value'))
        list.addList()
        list.saveList()
        list.update()
        newList.setAttribute('value', '')
        newList.value = ""
        
    } else {
        newList.style.border = '2px solid red'
        setTimeout(() => {
            newList.style.border = ""
        }, 3000);
    }
})