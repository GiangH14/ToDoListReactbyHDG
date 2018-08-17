import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import ToDoList from './ToDoList';
//import registerServiceWorker from './registerServiceWorker';

var destination = document.getElementById("container")

ReactDOM.render(
    <div><ToDoList/></div>, destination
);
//registerServiceWorker();
