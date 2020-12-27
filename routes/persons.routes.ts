import express from "express";
const router = express.Router();
import path from 'path';
import fs from 'fs';
import Person from "../models/person";
import rimraf from 'rimraf';

router.get("/", async (req, res) => {
	try {
		const persons = await Person.find()
		res.send(persons)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.post("/", async (req, res) => {
	try {
		const item = await Person.create(req.body)
		res.send(item)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.put("/:id", async (req, res) => {
	try {
		const updatedPerson = await Person.findByIdAndUpdate({ _id: req.params.id }, req.body)
		res.send(updatedPerson)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const person = await Person.deleteOne({ _id: req.params.id })
		const dirPath = path.join(__dirname, `../files/${req.params.id}`)
		if (fs.existsSync(dirPath)) {
			rimraf(dirPath, () => { })
		}
		res.send(true)
	} catch (error) {
		res.status(500).json({ message: 'server file error' })
	}
})

export default  router
