const express = require("express")
const router = express.Router()
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const Tasks = require("../models/tasks")

router.get("/", async (req, res) => {
	try {
		const { sort = '', limits = 999999 } = req.query
		const tasks = await Tasks.find().sort({ date: 1 }).limit(limits)
		res.send(tasks)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.post("/", async (req, res) => {
	try {
		const task = await Tasks.create(req.body)
		const { date, fix, failure, position } = req.body
		const newTask = await Tasks.findOne({ date, fix, failure })
		res.send(newTask)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.put("/:id", async (req, res) => {
	try {
		await Tasks.findByIdAndUpdate({ _id: req.params.id }, req.body)
		const task = await Tasks.findOne({ _id: req.params.id })
		res.send(task)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const data = await Tasks.deleteOne({ _id: req.params.id })
		const dirPath = path.join(__dirname, `../files/${req.params.id}`)
		if (fs.existsSync(dirPath)) {
			rimraf(dirPath, () => { })
		}
		res.send(data)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router;
