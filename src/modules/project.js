import Task from "./task.js"
import { format } from 'date-fns';

export default class Project {
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

    getTaskList() {
        return this.taskList;
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