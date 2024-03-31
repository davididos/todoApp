// Import Mongoose
const mongoose = require('mongoose');

// Define Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

// Export Task model
module.exports = Task;
