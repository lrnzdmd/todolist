// function to check if localstorage is available, it will probably go in
// it's own module, but i was reading about localstorage and thought i could
// get started with setting it up.

// UPDATE: node is the best, localstorage is here atm for testing and testing was good,
// can load and save from and to localstorage! now, should all this stuff be its own "storage" module?
const { format } = require("date-fns");
const { LocalStorage } = require("node-localstorage");

const localStorage = new LocalStorage("./scratch");

function checkForLocalStorage() {
    let storage;
    try {
        storage = window.localStorage;
        const x = "BINGO BANGO BONGO";
        storage.setItem(x, x);
        storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
          );
        }
}

function saveUserData(userobject) {
    const userJSON = JSON.stringify(userobject);
    localStorage.setItem("userData", userJSON);
}

function loadUserData() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const revivedProjectList = [];

    for (let i = 0; i < userData.projectList.length; i++) {
        const revivedTaskList = [];
        userData.projectList[i].taskList.forEach(tsk => revivedTaskList.push(new Task(tsk.title, tsk.description, tsk.dueDate, tsk.priority, tsk.noteList)));
        revivedProjectList.push(new Project(userData.projectList[i].title, userData.projectList[i].description, revivedTaskList));
    }

    return new User(userData.name, revivedProjectList);

}

class User {
    constructor (name = "Username", projectList = []) {
        this.name = name;
        this.projectList = projectList.length ? projectList : [new Project()];
        this.maxLengthName = 20;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        value < this.maxLengthName ? this.name = value : this.name = value.slice(0, this.maxLengthName);
    }

    addProject(value) {
        this.projectList.push(new Project(value.title, value.description, value.taskList))
    }

    removeProject(value) {
        const index = this.projectList.findIndex(proj => proj.title === value.title);
        this.taskList.splice(index, 1);
    }

    getProjectList() {
        return this.projectList;
    }
}

class Project {
    constructor (title = "My Example Project", description = "Short Project Description", taskList = []) {
        this.title = title;
        this.description = description;
        this.taskList = taskList.length ? taskList : [new Task()];
        this.maxLengthTitle = 15;
        this.maxLengthDescription = 30;
    }

    getTitle() {
        return this.title;
    }
    
    setTitle(value) {
        value.length <= this.maxLengthTitle ? this.title = value : this.title = value.slice(0, this.maxLengthTitle); 
    }

    getDescription() {
        return this.description;
    }
    
    setDescription(value) {
        value.length <= this.maxLengthDescription ? this.description = value : this.description = value.slice(0, this.maxLengthDescription); 
    }

    addTask(value) {
        this.taskList.push(new Task(value.title, value.description, value.dueDate, value.priority, value.noteList));
    }

    removeTask(value) {
        const index = this.taskList.findIndex(task => task.title === value.title);
        this.taskList.splice(index, 1);
    }

    clearCompleteTasks() {
        this.taskList = this.taskList.filter(task => !task.isComplete);
    }

    getTasksDueToday() {
        const tasksDueToday = [];
        this.taskList.forEach(task => {
                if (format(new Date(), "yyyy-mm-dd") === format(task.dueDate, "yyyy-mm-dd")) {
                    tasksDueToday.push(task);
                }
            });
            
        return tasksDueToday;
    }
}

class Task {
    constructor (title = "Example task..", description = "Short description", dueDate = null, priority = 1, noteList = []) {
        this.isComplete = false;
        this.dueDate = dueDate;
        this.priority = priority;

        this.title = title;
        this.description = description;
        this.noteList = noteList.length ? noteList : ["Notes about the task"];
        this.maxLengthTitle = 25;
        this.maxLengthDescription = 50; 
    }
    
    // Get and set method for task title...
    getTitle() {
        return this.title;
    }
    
    setTitle(value) {
        value.length <= this.maxLengthTitle ? this.title = value : this.title = value.slice(0, this.maxLengthTitle); 
    }

    getDescription() {
        return this.description;
    }
    // ... and description ...
    setDescription(value) {
        value.length <= this.maxLengthDescription ? this.description = value : this.description = value.slice(0, this.maxLengthDescription); 
    }
    // ... and the due date of the task ...
    getDueDate() {
        return this.dueDate;
    }

    setDueDate(value) {
        this.dueDate = value;
    }
    // ... finally the priority.
    getPriority() {
        return this.priority;
    }

    setPriority(value) {
        this.priority = value;
    }

    checkComplete() {
        this.isComplete = !this.isComplete;
    }

    addNote(value = "") {
        this.noteList.push(value);
    }

    removeNote(value) {
        const index = this.noteList.findIndex(itm => itm === value);
        this.noteList.splice(index, 1);
    }

    getNoteList() {
        return this.noteList;
    }
}
