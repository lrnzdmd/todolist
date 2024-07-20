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

class Task {
    constructor (title, description, dueDate, priority, defaultitem) {
        this.isDone = false;
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.isChecklist = false;
        this.list = [{item:defaultitem, checked:false}];
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

    // Titles explain these methods and they do not need a comment...
    // but let's separate the getsetters from the "good stuff"

    toggleIsCheckList() {
        this.isChecklist = !this.isChecklist;
    }

    addToList(value) {
        this.list.push({ item: value, checked: false });
    }

    removeFromList(value) {
        const index = this.list.findIndex(itm => itm.item === value.item);
        this.list.splice(index, 1);
    }

    // Not sure if a getlist can be much better than just accessing 
    // object.list but since i made getters/setters for everything else...

    getItemList() {
        return this.list;
    }
}

