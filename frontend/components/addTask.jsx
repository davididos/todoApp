import React, { useState } from 'react';

function createTask(title, description, setTasks) {
    const baseUrl = 'http://localhost:5000';
    const url = `${baseUrl}/tasks`;
    const body = {
        title: title,
        description: description
    };
    const headers = { "Content-Type": "application/json" };

    const requestParameters = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    };

    fetch(url, requestParameters)
        .then(async (res) => {
            const json = await res.json();
            setTasks(json); 
        })
        .catch((error) => {
            // Handle network errors
            console.error('Network Error adding task:', error);
        });
}

const AddTask = ({ setTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCreateTask = () => {
        createTask(title, description, setTasks);
    };

    return (
        <div>
            <input onChange={handleTitleChange} placeholder='Task Name' />
            <input onChange={handleDescriptionChange} placeholder='Description' />
            <button onClick={handleCreateTask}> Add </button>
        </div>
    );
}

export default AddTask;
