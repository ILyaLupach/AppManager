import express, { Request } from "express"
const router = express.Router()
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import Tasks from "../models/tasks"
import Person from "../models/person"
import Workshop from "../models/workshops"

interface SearchRequest extends Request {
	query: {
		limit: string, search: string, filter: string
	}
}

interface StatisticsRequest extends Request {
	query: {
		firstDate: string, lastDate: string
	}
}

router.get("/", async (req: SearchRequest, res) => {
	try {
		let { limit, search, filter } = req.query
		let tasks = await Tasks.find().sort({ date: 1 })
		if (filter) {
			tasks = tasks.filter(task => task.position === filter)
		}
		if (search && tasks.length) {
			search = search.toLowerCase()
			tasks = tasks.filter(
				task => task.name.map(str => str?.toLowerCase()).join('').includes(search) ||
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
		const { date, fix, failure } = req.body
		const newTask = await Tasks.findOne({ date, fix, failure })
		res.send(newTask)
		res.send(newTask)
		res.send(task)
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

router.get("/statistics", async (req: StatisticsRequest, res) => {
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
			tasks.reduce((acc: any[], value: any) => {
				return acc.map(o => {
					if (value.position === o.name) {
						o.value++
						if (!o.objects[value.object]) {
							o.objects[value.object] = 1
						}
						o.objects[value.object]++
					}
					return o
				})
			}, workshops.map((p: any) => ({ name: p.name, value: 0, objects: {} })))

		const personAndQuantityList = !tasks.length || !persons.length ? [] :
			tasks.reduce((acc: any[], value: any) => {
				return acc.map(o => {
					if (value.name.join('').includes(o.name)) o.value++
					return o
				})
			}, persons.map((p: any) => ({ name: p.surname, value: 0 })))

		const newDate = new Date()
		const allTasksYear = await Tasks.find({
			$or: [{
				date: {
					'$gte': new Date(newDate.setMonth(newDate.getMonth() - 12)),
					'$lte': new Date()
				}
			}]
		})

		const getMonthAndPositionsList = () => {
			if (!workshops.length || !allTasksYear.length) return []
			const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
				"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
			let positionsList = {}
			workshops.forEach((w: any) => positionsList = { ...positionsList, [w.name]: 0 })
			return allTasksYear.reduce((acc: any[], value: any) => {
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

export default router
