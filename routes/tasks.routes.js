const express = require("express")
const router = express.Router()
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const Tasks = require("../models/tasks")
const Person = require("../models/person")
const Workshop = require("../models/workshops")

router.get("/", async (req, res) => {
	try {
		let { limit, search, filter } = req.query
		let tasks = await Tasks.find().sort({ date: 1 })
		if (filter) {
			tasks = tasks.filter(task => task.position === filter)
		}
		if (search) {
			search = search.toLowerCase()
			tasks = tasks.filter(task =>
				task.name.map(str => str.toLowerCase()).join('').includes(search) ||
				task.position.toLowerCase().includes(search) ||
				task.object.toLowerCase().includes(search) ||
				task.failure.toLowerCase().includes(search) ||
				task.fix.toLowerCase().includes(search))
		}
		res.send(tasks.slice(-limit))
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

router.get("/statistics", async (req, res) => {
	try {
		let { firstDate, lastDate } = req.query
		const min = new Date(firstDate),
			max = new Date(lastDate)
		const tasks = await Tasks.find({
			$or: [{ date: { '$gte': min, '$lte': max } }]
		})
		const persons = await Person.find()
		const workshops = await Workshop.find()

		const positionAndQuantityList = !tasks.length || !workshops.length ? [] :
			tasks.reduce((acc, value) => {
				return acc.map(o => {
					if (value.position === o.name) o.value++
					return o
				})
			}, workshops.map(p => ({ name: p.name, value: 0 })))

		const personAndQuantityList = !tasks.length || !persons.length ? [] :
			tasks.reduce((acc, value) => {
				return acc.map(o => {
					if (value.name.join('').includes(o.name)) o.value++
					return o
				})
			}, persons.map(p => ({ name: p.surname, value: 0 })))

		const newDate = new Date()

		const getMonthAndPositionsList = async () => {
			const allTasksYear = await Tasks.find({
				$or: [{
					date: {
						'$gte': new Date(newDate.setMonth(newDate.getMonth() - 12)),
						'$lte': new Date()
					}
				}]
			})
			if (!workshops.length || !allTasksYear.length) return []
			const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
				"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
			let positionsList = {}
			workshops.forEach(w => positionsList = { ...positionsList, [w.name]: 0 })
			return allTasksYear.reduce((acc, value) => {
				const newDate = new Date(value.date)
				const date = `${months[newDate.getMonth()]} ${newDate.getFullYear()}`
				if (!acc.length) {
					return [{ ...positionsList, name: date, [value.position]: 1 }]
				}
				const i = acc.findIndex(o => o.name === date)
				i >= 0
					? acc[i][value.position]++
					: acc.push({ ...positionsList, name: date, [value.position]: 1 })
				return acc
			}, [])
		}

		let statisticsData = {
			positions: positionAndQuantityList,
			persons: personAndQuantityList,
			date: getMonthAndPositionsList(),
		}
		res.send(statisticsData)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
