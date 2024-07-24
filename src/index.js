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
    this.activeTask;
  }
  getActiveProject() {
    return this.activeProject;
  }
  setActiveProject(value) {
    this.activeProject = value;
  }
  getActiveTask() {
    return this.activeTask;
  }
  setActiveTask(value) {
    this.activeTask = value;
  }

  addStaticElementsListeners() {
    const homebtn = document.getElementById("homebtn");
    const settingsbtn = document.getElementById("settingsbtn");
    const addprojectbtn = document.getElementById("addprojectbtn");
    const duetodaybtn = document.getElementById("duetodaybtn");
    const cancelbtns = document.querySelectorAll(".cancelbtn");
    const editprojectform = document.getElementById("editprojectform");
    const edittaskform = document.getElementById("edittaskform");
    const cleandonetasksbtn = document.getElementById("cleandonetasksbtn");

    cleandonetasksbtn.addEventListener("click", () =>
      this.cleanDoneTasks(this.user)
    );
    cancelbtns.forEach((btn) =>
      btn.addEventListener("click", this.closeDialog)
    );
    editprojectform.addEventListener("submit", (event) =>
      this.editProject(event, this.activeProject)
    );
    edittaskform.addEventListener("submit", (event) =>
      this.editTask(event, this.activeTask)
    );
    homebtn.addEventListener("click", () => this.loadHome(this.user));
    settingsbtn.addEventListener("click", () => this.loadSettings(this.user));
    addprojectbtn.addEventListener("click", () => this.addProject(this.user));
    duetodaybtn.addEventListener("click", () => this.loadDueToday());
  }

  loadHome() {
    this.setActiveProject("home");
    this.refreshPage();
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
    this.setActiveProject("home");
    this.refreshPage();
  }
  callDialogEditProject(project) {
    this.setActiveProject(project);
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
    this.refreshPage();
  }

  addTask() {
    const index = this.user.projectList.findIndex(
      (proj) => proj.getProjectId() === this.activeProject.getProjectId()
    );
    user
      .getProjectList()
      [index].addTask({ projectId: this.activeProject.getProjectId() });
    this.refreshPage();
  }

  removeTask(task) {
    const index = this.user
      .getProjectList()
      .findIndex((proj) =>
        proj.getTaskList().some((tsk) => tsk.taskId === task.taskId)
      );
    this.user.getProjectList()[index].removeTask(task);
    this.refreshPage();
  }

  callDialogEditTask(task) {
    this.activeTask = task;
    const editTaskDialog = document.getElementById("edittask");
    const editnotebox = document.getElementById("notes");
    editnotebox.textContent = task.getNoteList()[0];
    editTaskDialog.showModal();
  }

  editTask(event, task) {
    event.preventDefault();
    const data = new FormData(edittaskform);
    const formData = Object.fromEntries(data.entries());
    task.setTitle(formData.title);
    task.setDescription(formData.description);
    task.setPriority(formData.priority);
    task.setDueDate(new Date(formData.duedate));
    task.getNoteList()[0] = formData.notes.replace(/\n/g, "<br>");
    console.log(formData.notes);
    edittaskform.reset();
    this.closeDialog(event);
    this.refreshPage();
  }

  expandTask(task) {
    this.setActiveTask(task);
    this.refreshPage();
  }

  checkTask(task) {
    task.checkComplete();
    this.refreshPage();
  }

  cleanDoneTasks(user) {
    user.getProjectList().forEach((project) => project.clearCompleteTasks());
    this.refreshPage();
  }

  createTaskCard(task) {
    const template = document.getElementById("taskcardtemplate");
    const taskCard = template.content.cloneNode(true);

    const checkmark = taskCard.querySelector(".check");

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

    if (task.getTaskId() === this.activeTask.getTaskId()) {
      task.getNoteList().forEach((note) => {
        const n = document.createElement("span");
        n.innerHTML = note;
        taskCard.querySelector("#notelist").appendChild(n);
      });
    }
    const taskdiv = taskCard.querySelector(".task");
    if (task.isComplete) {
      checkmark.innerHTML = `<div class = "checkmark"></div>`;
      const check = document.createElement("div");
      check.classList.add("completed");
      taskdiv.appendChild(check);
    }

    const editbtn = new Image();
    const removebtn = new Image();

    editbtn.src = editicon;
    removebtn.src = deleteicon;

    checkmark.addEventListener("click", () => this.checkTask(task));
    removebtn.addEventListener("click", () => this.removeTask(task));
    editbtn.addEventListener("click", () => this.callDialogEditTask(task));
    taskdiv.addEventListener("click", () => this.expandTask(task));

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
    editBtnDiv.addEventListener("click", () =>
      this.callDialogEditProject(project)
    );
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

    projTitle.textContent =
      this.activeProject === "home" || this.activeProject === "duetoday"
        ? "Home"
        : this.activeProject.getTitle();
    projDescription.textContent =
      this.activeProject === "home" || this.activeProject === "duetoday"
        ? "Let's get to it!"
        : this.activeProject.getDescription();
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

        if (!this.getActiveTask()) {
          this.setActiveTask(homeallTasks[0]);
        }

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
        if (!this.getActiveTask()) {
          this.setActiveTask(duetodayTasks[0]);
        }
        duetodayTasks.forEach((tsk) => {
          duetodayList.appendChild(this.createTaskCard(tsk));
        });
        content.appendChild(duetodayList);
        break;

      default:
        if (!this.getActiveTask()) {
          this.setActiveTask(this.getActiveProject().getTaskList()[0]);
        }
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
