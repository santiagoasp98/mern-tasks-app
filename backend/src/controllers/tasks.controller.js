import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });

    const taskSaved = await newTask.save();
    if (!taskSaved) return res.status(400).json({ message: 'Error creating task' });

    res.status(201).json(taskSaved);
};

export const getTasks = async (req, res) => {
    // get the tasks that match with the user id
    const tasks = await Task.find({ user: req.user.id }).populate('user');
    res.json(tasks);
};

export const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    res.status(200).json(task);
};

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).populate('user');
    res.status(200).json(task);
};

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};
