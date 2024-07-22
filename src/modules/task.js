export default class Task {
    constructor (title = "Example task..", description = "Short description", dueDate = " ", priority = 1, noteList = []) {
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
