const assert = require('assert');
const axios = require('axios'); // You may need to install axios using npm or yarn

// Function to perform tests
async function runTests() {
  // Define the base URL of your backend
  const baseUrl = 'http://localhost:5000';

  try {
    // Test getting all tasks to check how many are currently in
    const getAllTasksResponse = await axios.get(`${baseUrl}/tasks`);
    assert.strictEqual(getAllTasksResponse.status, 200, 'Getting tasks should return status code 200');
    const allTasks = getAllTasksResponse.data;
    assert.ok(Array.isArray(allTasks), 'Response should be an array of tasks');
    console.log('\x1b[32m%s\x1b[0m', 'Getting all tasks test passed');
    
    
    //checking how many tasks are in the system initally in order to check system behaviour in subsequent tests
    const originalTaskLength = allTasks.length;

    // Test creating a new task
    const newTaskResponse = await axios.post(`${baseUrl}/tasks`, {
      title: 'Test Task',
      description: 'This is a test task',
    });
    assert.strictEqual(newTaskResponse.status, 201, 'Creating task should return status code 201');
    const createdTask = newTaskResponse.data;
    assert.strictEqual(createdTask.title, 'Test Task', 'Task title should match');
    assert.strictEqual(createdTask.description, 'This is a test task', 'Task description should match');
    console.log('\x1b[32m%s\x1b[0m', 'Creating a new task passed');
    

    // Test getting all tasks
    const getTasksResponse = await axios.get(`${baseUrl}/tasks`);
    assert.strictEqual(getTasksResponse.status, 200, 'Getting tasks should return status code 200');
    const tasks = getTasksResponse.data;
    assert.ok(Array.isArray(tasks), 'Response should be an array of tasks');
    assert.strictEqual(tasks.length, originalTaskLength + 1, 'There should be exactly one task returned');
    console.log('\x1b[32m%s\x1b[0m', 'Getting tasks test passed');

    // Test updating a task
    const updatedTaskResponse = await axios.put(`${baseUrl}/tasks/${createdTask._id}`, {
      title: 'Updated Test Task',
      description: 'This is an updated test task',
      completed: true,
    });
    assert.strictEqual(updatedTaskResponse.status, 200, 'Updating task should return status code 200');
    const updatedTask = updatedTaskResponse.data;
    assert.strictEqual(updatedTask.title, 'Updated Test Task', 'Updated task title should match');
    assert.strictEqual(updatedTask.description, 'This is an updated test task', 'Updated task description should match');
    assert.strictEqual(updatedTask.completed, true, 'Updated task completed status should be true');
    console.log('\x1b[32m%s\x1b[0m', 'Updating task test passed');
    
    // Test deleting a task
    const deleteTaskResponse = await axios.delete(`${baseUrl}/tasks/${createdTask._id}`);
    assert.strictEqual(deleteTaskResponse.status, 200, 'Deleting task should return status code 200');
    const afterDeletionTasksResponse = await axios.get(`${baseUrl}/tasks`);
    assert.strictEqual(afterDeletionTasksResponse.status, 200, 'Getting tasks should return status code 200');
    const tasksAfterDeletionLength = afterDeletionTasksResponse.data.length;
    assert.strictEqual(tasksAfterDeletionLength, originalTaskLength, 'After deleting the task there should be as many tasks as in the start of the test');
    console.log('\x1b[32m%s\x1b[0m', 'Deleting task test passed');
    console.log('All tests passed successfully');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Test failed:', error.message);
  }
}

// Run the tests
runTests();
