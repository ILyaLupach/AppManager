const express = require("express");
const router = express.Router();
const person = require("../models/person");

router.get("/", (req, res) => {
	person.find()
		.then((person) => {
			res.send(person);
		})
})
router.post("/", (req, res) => {
	person.create(req.body)
		.then((pers) => {
			res.send(pers)
		})
})
router.put("/:id", (req, res) => {
	person.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then(() => {
			person.findOne({ _id: req.params.id })
				.then((person) => {
					res.send(person);
				})
		})
})
router.delete("/:id", (req, res) => {
	person.deleteOne({ _id: req.params.id })
		.then((person) => {
			res.send(person)
		})
})

module.exports = router
