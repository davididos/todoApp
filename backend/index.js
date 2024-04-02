// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./db/taskModel');
const cors = require('cors');
const {createTaskValidation, updateTaskValidation, deleteTaskValidation} = require('./types.js')
// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

//tk zod validation

// Connect to MongoDB - specify the database in the end of the connection string
mongoose.connect('mongodb+srv://davididos9:mongoMongoInTheTree@cluster0.7babeyh.mongodb.net/taskManager')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define routes

// Route to create a new task
app.post('/tasks', async (req, res) => {
  try {
    const validatedPayload = createTaskValidation.safeParse(req.body);
    if(!validatedPayload.success){
      res.status(411).json({msg: 'invalid inputs'})
      return;
    }
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a task by ID
app.delete('/tasks/:_id', async (req, res) => {
  try {
    const validatedPayload = deleteTaskValidation.safeParse(req.params);
    if(!validatedPayload.success){
      res.status(411).json({msg: 'invalid inputs'})
      return;
    }
    const taskId = req.params._id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

// Route to update a task by ID
app.put('/tasks/:_id', async (req, res) => {
  try {
    const validatedPayload = updateTaskValidation.safeParse(req.params);
    if(!validatedPayload.success){
      res.status(411).json({msg: 'invalid inputs'})
      return;
    }
    const taskId = req.params._id;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.log('put error: ', error.message)
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

