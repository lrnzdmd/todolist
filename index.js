// function to check if localstorage is available, it will probably go in
// it's own module, but i was reading about localstorage and thought i could
// get started with setting it up.

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
}

class Task {
    constructor (title = "Example task..", description = "Short description", dueDate = null, priority = 1, noteList = []) {
        this.isDone = false;
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

    checkDone() {
        this.isDone = !this.isDone;
    }

    addNote(value = "") {
        this.noteList.push({ item: value, checked: false });
    }

    removeNote(value) {
        const index = this.noteList.findIndex(itm => itm === value);
        this.noteList.splice(index, 1);
    }

    getNoteList() {
        return this.noteList;
    }
}
