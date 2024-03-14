const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
    try {
        const todos = await ToDoModel.find();
        res.send(todos);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.saveToDo = async (req, res) => {
    try {
        const { text } = req.body;
        const newToDo = await ToDoModel.create({ text });
        console.log("Added Successfully...");
        console.log(newToDo);
        res.send(newToDo);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.deleteToDo = async (req, res) => {
    try {
        const { _id } = req.body;
        await ToDoModel.findByIdAndDelete(_id);
        res.status(201).send("Deleted Successfully...");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.updateToDo = async (req, res) => {
    try {
        const { _id, text } = req.body;
        await ToDoModel.findByIdAndUpdate(_id, { text });
        res.status(201).send("Updated Successfully...");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
