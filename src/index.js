import { saveUserDataListener, loadUserData } from "./modules/storage.js";
import Task from "./modules/task.js";
import Project from "./modules/project.js";
import User from "./modules/user.js";
import "./style.css"

import editicon from "./images/edit.svg";
import deleteicon from "./images/delete.svg";
import deleteiconred from "./images/deletered.svg";
import birdlistlogo from "./images/logo.png";



class DisplayManager { 
    constructor (user) {
        this.user = user;
    }
    
  addStaticElementsListeners() {
    const homebtn = document.getElementById("homebtn");
    const settingsbtn = document.getElementById("settingsbtn");
    const addprojectbtn = document.getElementById("addprojectbtn");
    const duetodaybtn = document.getElementById("duetodaybtn");

    homebtn.addEventListener("click", () => this.loadHome(this.user));
    settingsbtn.addEventListener("click", () => this.loadSettings(this.user));
    addprojectbtn.addEventListener("click", () => this.addProject(this.user));
    duetodaybtn.addEventListener("click", () => this.loadDueToday(this.user));
  }

  loadDueToday() {
    return;
  }

  loadHome() {
    this.refreshSidebar();

    const content = document.getElementById("content");
    content.innerHTML = "";
    const taskslist = document.createElement("div");
    taskslist.classList.add("taskslist");

    const allTasks = this.user.getAllTasks();

    allTasks.forEach((tsk) => {
      taskslist.appendChild(this.createTaskCard(tsk));
    });

    /*const addtaskbtn = document.createElement("div");
    addtaskbtn.id = "addtaskbtn";
    addtaskbtn.innerHTML = "<p>+</p>";
    taskslist.appendChild(addtaskbtn);
    addtaskbtn.addEventListener("click", () => addTask(this.user));*/
  }

  loadSettings() {
    return;
  }

  addProject() {
    return;
  }

  removeProject(project) {
    this.user.removeProject(project);
    this.refreshSidebar(this.user);
  }

  addTask() {
    return;
  }

  createTaskCard(task) {
    const template = document.getElementById("taskcardtemplate");
    const taskCard = template.content.cloneNode(true);

    taskCard.querySelector(".taskname b").textContent = task.name;
    taskCard.querySelector(".taskname p:nth-child(2)").textContent = task.description;
    taskCard.querySelector(".priorityduedate p:nth-child(1) b").textContent = task.priority;
    taskCard.querySelector(".priorityduedate p:nth-child(2) b").textContent = task.dueDate;
    

    const editbtn = new Image();
    const removebtn = new Image();

    editbtn.src = editicon;
    removebtn.src = deleteicon;

    const editremovecontrols = taskCard.querySelector(".editremove");
    
    editremovecontrols.appendChild(editbtn);
    editremovecontrols.appendChild(removebtn);

    return taskCard;
  }

  createProjectCard(project) {
    const projectBoxDiv = document.createElement("div");
    projectBoxDiv.className = "projectbox";

    const projectNameP = document.createElement("p");
    projectNameP.textContent = project.getTitle();

    const removeBtnDiv = document.createElement("div");
    removeBtnDiv.className = "removebtn";

    const deleteIconImg = new Image();
    deleteIconImg.src = deleteiconred;
    deleteIconImg.alt = "deleteicon";

    removeBtnDiv.addEventListener("click", () => removeProject(project))
   
    removeBtnDiv.appendChild(deleteIconImg);
    projectBoxDiv.appendChild(projectNameP);
    projectBoxDiv.appendChild(removeBtnDiv);

    return projectBoxDiv;
  }

  refreshSidebar() {
    const logoDiv = document.querySelector(".logo");
    const logoImg = new Image();
    logoImg.src = birdlistlogo;
    logoImg.alt = "birdlistlogo";
    const logoText = document.createElement("p");
    logoText.textContent = "BirdList";
    
    logoDiv.appendChild(logoImg);
    logoDiv.appendChild(logoText);
   

    const projectlist = document.getElementById("projectslist");
    projectlist.innerHTML = "";
    this.user.getProjectList().forEach((project) => {
        const proj = this.createProjectCard(project);
        projectlist.appendChild(proj);
    });
    }
}

const user = loadUserData();



const display = new DisplayManager(user);
saveUserDataListener(display.user);


display.loadHome();