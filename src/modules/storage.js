import User from "./user.js"
import Project from "./project.js";
import Task from "./task.js";

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

function saveUserData(user) {
  if (checkForLocalStorage()) {
        const userJSON = JSON.stringify(user);
        localStorage.setItem("userData", userJSON);
      }
}

function loadUserData() {
  if (checkForLocalStorage && localStorage.getItem("userData") !== null) {
      const loadedUser = reviveData();
      
      return loadedUser;
  } else {
      const name = prompt("what's your name?");
      const newUser = new User(name, []);
    
      return newUser;
  }
  }

function reviveData() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const revivedProjectList = [];

    for (let i = 0; i < userData.projectList.length; i++) {
        const revivedTaskList = [];
        userData.projectList[i].taskList.forEach(tsk => revivedTaskList.push(new Task(tsk.taskId, tsk.projectId, tsk.title, tsk.description, tsk.dueDate, tsk.priority, tsk.noteList)));
        revivedProjectList.push(new Project(userData.projectList[i].projectId, userData.projectList[i].title, userData.projectList[i].description, revivedTaskList));
    }

    return new User(userData.name, revivedProjectList);

}

export { checkForLocalStorage, saveUserData, loadUserData };