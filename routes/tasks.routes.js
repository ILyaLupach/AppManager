const express = require("express")
const router = express.Router()
const tasks = require("../models/tasks")

router.get("/", (req, res) => {
	tasks.find()
		.then((task) => {
			res.send(task)
		})
})
router.post("/", (req, res) => {
	tasks.create(req.body)
		.then((task) => {
			res.send(task)
		})
})
router.put("/:id", (req, res) => {
	tasks.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then(() => {
			tasks.findOne({ _id: req.params.id })
				.then((task) => {
					res.send(task);
				})
		})
})
router.delete("/:id", (req, res) => {
	tasks.deleteOne({ _id: req.params.id })
		.then((task) => {
			res.send(task)
		})
})

module.exports = router;
