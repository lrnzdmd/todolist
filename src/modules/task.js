import createId from "./createid.js";

export default class Task {
    constructor (taskId = createId("Example task...."), projectId, title = "Example task..", description = "Short description", dueDate = " ", priority = "Normal", noteList = []) {
        this.taskId = taskId;
        this.projectId = projectId;
        this.isComplete = false;
        this.dueDate = dueDate;
        this.priority = priority;

        this.title = title;
        this.description = description;
        this.noteList = noteList.length ? noteList : ["Notes about the task"];
        this.maxLengthTitle = 25;
        this.maxLengthDescription = 50; 
    }

    getTaskId() {
        return this.taskId;
    }

    getProjectId() {
        return this.projectId;
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

