const zod = require('zod');

const createTaskValidation = zod.object({
    title: zod.string(),
    description: zod.string()
});

const updateTaskValidation = zod.object({
    _id: zod.string()
});

const deleteTaskValidation = zod.object({
    _id: zod.string()
});

module.exports = {
    createTaskValidation: createTaskValidation,
    updateTaskValidation: updateTaskValidation,
    deleteTaskValidation: deleteTaskValidation
}

