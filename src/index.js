import { saveUserData, loadUserData } from "./modules/storage.js";
import Task from "./modules/task.js";
import Project from "./modules/project.js";
import User from "./modules/user.js";
import "./style.css";

import editicon from "./images/edit.svg";
import editiconblack from "./images/editblack.svg";
import deleteicon from "./images/delete.svg";
import deleteiconred from "./images/deletered.svg";
import birdlistlogo from "./images/logo.png";

class DisplayManager {
  constructor(user) {
    this.user = user;
    this.activeProject = "home";
  }
  getActiveProject() {
    return this.activeProject;
  }
  setActiveProject(value) {
    this.activeProject = value;
  }

  addStaticElementsListeners() {
    const homebtn = document.getElementById("homebtn");
    const settingsbtn = document.getElementById("settingsbtn");
    const addprojectbtn = document.getElementById("addprojectbtn");
    const duetodaybtn = document.getElementById("duetodaybtn");
    const cancelbtn = document.getElementById("cancelbtn");
    const editprojectform = document.getElementById("editprojectform");

    cancelbtn.addEventListener("click", this.closeDialog);
    editprojectform.addEventListener("submit", (event) => this.editProject(event, this.activeProject));
    homebtn.addEventListener("click", () => this.loadHome(this.user));
    settingsbtn.addEventListener("click", () => this.loadSettings(this.user));
    addprojectbtn.addEventListener("click", () => this.addProject(this.user));
    duetodaybtn.addEventListener("click", () => this.loadDueToday());
  }

  loadHome() {
    this.setActiveProject("home");
    this.refreshPage();

    // this shows the add task button, not supposed to be in the home but sice i wrote it i'll keep it here
    
  }

  loadProject(project) {
    this.setActiveProject(project);
    this.refreshPage();
  }

  loadDueToday() {
    this.setActiveProject("duetoday");
    this.refreshPage();

  }

  loadSettings() {
    return;
  }

  addProject() {
    this.user.addProject({});
    this.refreshPage();
  }

  removeProject(project) {
    this.user.removeProject(project);
    this.refreshPage();
  }
  callDialogEditProject(project) {
    this.activeProject = project;
    const editProjectDialog = document.getElementById("editproject");
    editProjectDialog.showModal();
  }

  editProject(event, project) {
    event.preventDefault();
    const data = new FormData(editprojectform);
    const formData = Object.fromEntries(data.entries());
    project.setTitle(formData.title);
    project.setDescription(formData.description);
    editprojectform.reset();
    this.closeDialog(event);
    this.refreshPage()
  }

  addTask() {
    console.log("beep boop add task boop");
    return;
  }

  createTaskCard(task) {
    const template = document.getElementById("taskcardtemplate");
    const taskCard = template.content.cloneNode(true);

    taskCard.querySelector(".taskname b").textContent = task.getTitle();
    taskCard.querySelector(".taskname p:nth-child(2)").textContent =
      task.getDescription();
    taskCard.querySelector(".priorityduedate p:nth-child(1) b").textContent =
      task.getPriority();
    if (task.getDueDate() !== " ") {
      taskCard.querySelector(".priorityduedate p:nth-child(2) b").textContent =
        task.getDueDate();
    } else {
      taskCard.querySelector(".priorityduedate p:nth-child(2)").textContent =
        " ";
    }

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

    const editBtnDiv = document.createElement("div");
    editBtnDiv.className = "roundbtn";

    const editIconImg = new Image();
    editIconImg.src = editiconblack;
    editIconImg.alt = "editicon";

    const removeBtnDiv = document.createElement("div");
    removeBtnDiv.className = "roundbtn";

    const deleteIconImg = new Image();
    deleteIconImg.src = deleteiconred;
    deleteIconImg.alt = "deleteicon";

    removeBtnDiv.addEventListener("click", () => this.removeProject(project));
    editBtnDiv.addEventListener("click", () => this.callDialogEditProject(project));
    projectNameP.addEventListener("click", () => this.loadProject(project));

    editBtnDiv.appendChild(editIconImg);
    removeBtnDiv.appendChild(deleteIconImg);
    projectBoxDiv.appendChild(editBtnDiv);
    projectBoxDiv.appendChild(projectNameP);
    projectBoxDiv.appendChild(removeBtnDiv);

    return projectBoxDiv;
  }

  refreshHeader() {
    const projTitle = document.getElementById("hprojecttitle");
    const projDescription = document.getElementById("hprojectdescr");
    const userName = document.getElementById("username");
    const tasksDueToday = document.getElementById("tasksduetoday");

    projTitle.textContent = (this.activeProject === "home"||this.activeProject === "duetoday") ? "Home" : this.activeProject.getTitle();
    projDescription.textContent = (this.activeProject === "home"||this.activeProject === "duetoday") ? "Let's get to it!" : this.activeProject.getDescription(); 
    userName.textContent = user.getName();
    tasksDueToday.textContent = user.getTasksDueToday().length;
  }

  refreshSidebar() {
    const logoDiv = document.querySelector(".logo");
    if (!logoDiv.querySelector("img")) {
      const logoImg = new Image();
      logoImg.src = birdlistlogo;
      logoImg.alt = "birdlistlogo";
      const logoText = document.createElement("p");
      logoText.textContent = "BirdList";

      logoDiv.appendChild(logoImg);
      logoDiv.appendChild(logoText);
    }

    const projectlist = document.getElementById("projectslist");
    projectlist.innerHTML = "";
    this.user.getProjectList().forEach((project) => {
      const proj = this.createProjectCard(project);
      projectlist.appendChild(proj);
    });
  }

  refreshContent() {
    const content = document.getElementById("content");
    content.innerHTML = "";

    switch (this.activeProject) {
      case "home":
        console.log("refresh switched on home");

        const homeList = document.createElement("div");
        homeList.id = "taskslist";
        const homeallTasks = this.user.getAllTasks();
        homeallTasks.forEach((tsk) => {
          homeList.appendChild(this.createTaskCard(tsk));
        });

        content.appendChild(homeList);

        break;
    
        case "duetoday":
            console.log("refresh switched on duetoday");

            const duetodayList = document.createElement("div");
            duetodayList.id = "taskslist";
            const duetodayTasks = this.user.getTasksDueToday();
            duetodayTasks.forEach((tsk) => {
                duetodayList.appendChild(this.createTaskCard(tsk));
            });
            content.appendChild(duetodayList);
        break;

      default:
        console.log(`console switched on ${this.activeProject.title}`);
        const projectList = document.createElement("div");
        projectList.id = "taskslist";
        this.activeProject.getTaskList().forEach((tsk) => {
          projectList.appendChild(this.createTaskCard(tsk));
        });
        
        const addtaskbtn = document.createElement("div");
        addtaskbtn.id = "addtaskbtn";
        addtaskbtn.classList.add("plusbtn");
        addtaskbtn.innerHTML = "<p>+</p>";
        projectList.appendChild(addtaskbtn);
        addtaskbtn.addEventListener("click", () => this.addTask(this.user));

        content.appendChild(projectList);
        
    }
  }

  refreshPage() {
    this.refreshContent();
    this.refreshHeader();
    this.refreshSidebar();

  }

  closeDialog(event) {
    const dialog = event.target.closest("dialog");
    dialog.close();
  }
}

const user = loadUserData();
const display = new DisplayManager(user);
setInterval(saveUserData, 5000, display.user);
display.addStaticElementsListeners();

display.loadHome();
