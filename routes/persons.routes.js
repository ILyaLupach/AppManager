const express = require("express");
const router = express.Router();
const path = require('path')
const fs = require('fs')
const Person = require("../models/person")
const rimraf = require('rimraf')

router.get("/", async (req, res) => {
	try {
		const person = await Person.find()
		res.send(person)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.post("/", async (req, res) => {
	try {
		const item = await Person.create(req.body)
		const person = await Person.findOne({
			name: item.name, surname: item.surname, phone: item.phone
		})
		res.send(person)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.put("/:id", async (req, res) => {
	try {
		const person = await Person.findByIdAndUpdate({ _id: req.params.id }, req.body)
		const updatedPerson = await Person.findOne({ _id: req.params.id })
		res.send(updatedPerson)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const person = await Person.deleteOne({ _id: req.params.id })
		const dirPath = path.join(__dirname, `../files/${req.params.id}`)
		console.log(dirPath)
		if (fs.existsSync(dirPath)) {
			rimraf(dirPath, () => { })
		}
		res.send(true)
	} catch (error) {
		res.status(500).json({ message: 'server file error' })
	}
})

module.exports = router
