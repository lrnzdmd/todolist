import { saveUserData, loadUserData } from "./modules/storage.js";
import Task from "./modules/task.js";
import Project from "./modules/project.js"
import User from "./modules/user.js"



const user = loadUserData();

saveUserData(user);