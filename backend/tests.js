const assert = require('assert');
const axios = require('axios'); // You may need to install axios using npm or yarn

// Function to perform tests
async function runTests() {
  // Define the base URL of your backend
  const baseUrl = 'http://localhost:5000';

  try {
    // Test creating a new task
    const newTaskResponse = await axios.post(`${baseUrl}/tasks`, {
      title: 'Test Task',
      description: 'This is a test task',
    });
    assert.strictEqual(newTaskResponse.status, 201, 'Creating task should return status code 201');
    const createdTask = newTaskResponse.data;
    console.log('createdTask', createdTask);
    assert.strictEqual(createdTask.title, 'Test Task', 'Task title should match');
    assert.strictEqual(createdTask.description, 'This is a test task', 'Task description should match');
    console.log('Creating task test passed');

    // Test getting all tasks
    const getTasksResponse = await axios.get(`${baseUrl}/tasks`);
    assert.strictEqual(getTasksResponse.status, 200, 'Getting tasks should return status code 200');
    const tasks = getTasksResponse.data;
    assert.ok(Array.isArray(tasks), 'Response should be an array of tasks');
    assert.strictEqual(tasks.length, 1, 'There should be exactly one task returned');
    console.log('Getting tasks test passed');

    // Test updating a task
    const updatedTaskResponse = await axios.put(`${baseUrl}/tasks/${createdTask._id}`, {
      title: 'Updated Test Task',
      description: 'This is an updated test task',
      completed: true,
    });
    assert.strictEqual(updatedTaskResponse.status, 200, 'Updating task should return status code 200');
    const updatedTask = updatedTaskResponse.data;
    console.log('updated task', updatedTask);
    assert.strictEqual(updatedTask.title, 'Updated Test Task', 'Updated task title should match');
    assert.strictEqual(updatedTask.description, 'This is an updated test task', 'Updated task description should match');
    assert.strictEqual(updatedTask.completed, true, 'Updated task completed status should be true');
    console.log('Updating task test passed');

    // Test deleting a task
    const deleteTaskResponse = await axios.delete(`${baseUrl}/tasks/${createdTask._id}`);
    assert.strictEqual(deleteTaskResponse.status, 200, 'Deleting task should return status code 200');
    console.log('Deleting task test passed');

    // Test getting all tasks when no tasks are present
    const getEmptyTasksResponse = await axios.get(`${baseUrl}/tasks`);
    assert.strictEqual(getEmptyTasksResponse.status, 200, 'Getting tasks should return status code 200');
    const emptyTasks = getEmptyTasksResponse.data;
    assert.ok(Array.isArray(emptyTasks), 'Response should be an array of tasks');
    assert.strictEqual(emptyTasks.length, 0, 'There should be no tasks returned');
    console.log('Getting empty tasks test passed');

    console.log('All tests passed successfully');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the tests
runTests();
