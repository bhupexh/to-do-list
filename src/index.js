import './index.css';
import createProjectObject from './project';

let project = createProjectObject();
project.setItem("Movie Night", "Big Day", "2024-04-25", "1");

localStorage.setItem("project", project.toJSON());
console.log(localStorage.getItem("project"));