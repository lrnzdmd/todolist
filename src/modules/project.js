import Task from "./task.js"
import { format, isValid } from 'date-fns';

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
        const today = new Date();
        this.taskList.forEach(task => {
            const taskDueDate = new Date(task.dueDate);
    
            if (isValid(taskDueDate) && format(today, "yyyy-MM-dd") === format(taskDueDate, "yyyy-MM-dd")) {
                tasksDueToday.push(task);
            }
        });
            
        return tasksDueToday;
    }
}