export class CreateList{
    constructor(name){
        this.name = name
        this.id = name.split(' ').join('-')
    }

    update(){
        const listsDel = document.querySelectorAll('.delete-list')
        listsDel.forEach(el => {
            el.addEventListener('click', (e) => {
                console.log(e);
                document.querySelector('.lists-container').removeChild(e.path[1])
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
                if(taskInput.getAttribute('value') != ""){
                    let task = new CreateTask(listUl, taskInput.getAttribute('value'))
                    task.addTask()
                    task.updateTasks()
                    taskInput.setAttribute('value', "")
                    taskInput.value = ""
                } else {
                    taskInput.style.border = '2px solid red'
                    setTimeout(() => {
                        taskInput.style.border = ""
                    }, 3000);
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
                e.path[3].removeChild(e.path[2])
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
        this.target.appendChild(task)
    }
}