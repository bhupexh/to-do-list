import './index.css';
import createProjectObject from './project';
import './dom';

export let project = createProjectObject();
project.setItem("Movie Night", "Big Day", "2024-04-30", "1", "1");
console.log(localStorage.getItem("project"));