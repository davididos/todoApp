import React, { useState, useEffect } from 'react';
import Task from '../components/taskDisplay';
import AddTask from '../components/addTask'; 
//import reactLogo from './assets/react.svg';
//import viteLogo from './vite.svg';
//import './App.css';

const baseUrl = 'http://localhost:5000';
const url = `${baseUrl}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);

  fetch(url)
      .then(async (res) => {
        const json = await res.json();
        setTasks(json);
      })

      return (
        <div>
          <AddTask />
          {tasks.map((task, index) => (
            <Task key={index} title={task.title} description={task.description} />
          ))}
        </div>
      );
}

export default App;
