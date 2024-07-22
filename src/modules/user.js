import Project from "./project.js";

export default class User {
    constructor (name = "Username", projectList = []) {
        this.name = name;
        this.projectList = projectList.length ? projectList : [new Project()];
        this.maxLengthName = 20;

        this.removeProject = this.removeProject.bind(this);
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
        this.projectList.splice(index, 1);
    }

    getProjectList() {
        return this.projectList;
    }

    getAllTasks() {
        const allTasks = [];
        this.projectList.forEach(project => {
            project.getTaskList().forEach(task => {
                allTasks.push(task);
            });
        });
        return allTasks;
    }

    getTasksDueToday() {
        const tasksDueToday = [];
        this.projectList.forEach(project => {
                project.getTasksDueToday().forEach(task => tasksDueToday.push(task));
            });
            
        return tasksDueToday;

    }
}