import React from 'react';

const Task = ({ title, description }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Done</button>
    </div>
  );
}

export default Task;
