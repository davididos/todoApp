// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./db/taskModel');

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://davididos9:mongoMongoInTheTree@cluster0.7babeyh.mongodb.net/taskManager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define routes

// Route to create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a task by ID
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  require('./tests.js');
});

