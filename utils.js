export class CreateList{
    constructor(name){
        this.name = name
        this.id = name.split(' ').join('-')
    }


    update(){
        const listsDel = document.querySelectorAll('.delete-list')
        listsDel.forEach(el => {
            el.addEventListener('click', (e) => {
                e.target.parentNode.style.opacity = '0'
                let dataArray = JSON.parse(localStorage.getItem('MyLists'))
                let newData = []
                dataArray.forEach(item => {
                    if(item.id != e.target.parentNode.getAttribute('id')){
                        newData.push(item)
                    }
                })
                localStorage.setItem('MyLists', JSON.stringify(newData))
                setTimeout(() => {
                    document.querySelector('.lists-container').removeChild(e.path[1])
                }, 1500);
            })
        })
        const lists = document.querySelectorAll('.list')
        lists.forEach(list => {
            let id = list.getAttribute('id')
            const btnAddTask = document.getElementById(id + 'ButtonAdd')
            const btnDelTask = document.getElementById(id + 'ButtonDelete')
            const taskInput = document.getElementById(id + 'Input')
            const listUl = document.getElementById(id + 'Ul')

            taskInput.addEventListener('input', e => {
                taskInput.setAttribute('value', e.target.value)
            })
            btnAddTask.addEventListener('click', () => {
                if(taskInput.getAttribute('value') && taskInput.getAttribute('value') != ""){
                    let task = new CreateTask(listUl, taskInput.getAttribute('value'))
                    task.addTask()
                    task.updateTasks()
                    task.saveTask()
                    taskInput.setAttribute('value', "")
                    taskInput.value = ""
                }
            })

        })
    }

    addList(){
        let list = document.createElement('div')
        list.setAttribute('id', this.id)
        list.className = "list"
        list.innerHTML = `
            <p class="delete-list" id="${this.id}ButtonDelete">+</p>
            <h3>My ${this.name} List</h3>
            <div class="list-input-container">
                <input type="text" id="${this.id}Input" value="" placeholder="Add Your Task">
                <button id="${this.id}ButtonAdd">+</button>
            </div>
            <ul id="${this.id}Ul"></ul>
        `
        document.querySelector('.lists-container').appendChild(list)
        setTimeout(() => {
            list.style.opacity = '1'
        }, 1000);
    }
    saveList(){
        let datas = {
            name: this.name,
            id: this.id,
            tasks: []
        }
        if(localStorage.getItem('MyLists')){
            let dataArray = JSON.parse(localStorage.getItem('MyLists'))
            dataArray.push(datas)
            localStorage.setItem('MyLists', JSON.stringify(dataArray))
        } else {
            let dataArray = []
            dataArray.push(datas)
            localStorage.setItem('MyLists', JSON.stringify(dataArray))
        }
    }
}

export class CreateTask{
    constructor(target, task){
        this.target = target
        this.task = task
        this.id = task.split(' ').join('-')
    }

    updateTasks(){
        let tasksListener = document.querySelectorAll('.delete-task')
        tasksListener.forEach(item => {
            item.addEventListener('click', e => {
                e.path[2].style.opacity = "0"
                let allLists = JSON.parse(localStorage.getItem('MyLists'))
                for (const list of allLists) {
                    let newTasks = []
                    for (const task of list.tasks) {
                        if(task.id + 'Task' != e.path[2].getAttribute('id')){
                            newTasks.push(task)
                        }
                    }
                    list.tasks = newTasks
                }
                localStorage.setItem('MyLists', JSON.stringify(allLists))

                setTimeout(() => {
                    e.path[3].removeChild(e.path[2])
                }, 1000);
            })
        })
    }

    addTask(){
        let task = document.createElement('li')
        task.innerHTML = `
            <h3>${this.task}</h3>
            <p class="delete-task"><i class="fa-solid fa-trash-can"></i></p>
        `
        task.setAttribute('id', this.id + 'Task')
        task.style.opacity = "0"
        this.target.appendChild(task)
        setTimeout(() => {
            task.style.opacity = "1"
        }, 1000);
    }

    saveTask(){
        let datas = {
            task: this.task,
            id: this.id
        }

        let dataArray = JSON.parse(localStorage.getItem('MyLists'))
        dataArray.forEach(list => {
            if(list.name + 'Ul' == this.target.getAttribute('id')){
                list.tasks.push(datas)
            }
        })
        localStorage.setItem('MyLists', JSON.stringify(dataArray))
    }
}

export function checkStorage(){
    if(localStorage.getItem('MyLists')){
        let allLists = JSON.parse(localStorage.getItem('MyLists'))
        for (const list of allLists) {
            let listCreate = new CreateList(list.name)
            listCreate.addList()
            listCreate.update()
            for (const task of list.tasks) {
                let ul = document.getElementById(list.id + 'Ul')
                let displayTask = new CreateTask(ul, task.task)
                displayTask.addTask()
                displayTask.updateTasks()
            }
        }
    }
}