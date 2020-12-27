import express from "express"
const router = express.Router()
import workshop from "../models/workshops"

router.get("/", (req, res) => {
	workshop.find()
		.then((workshop) => {
			res.send(workshop)
		})
})
router.post("/", (req, res) => {
	workshop.create(req.body)
		.then((workshop) => {
			res.send(workshop)
		})
})
router.put("/:id", (req, res) => {
	workshop.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then(() => {
			workshop.findOne({ _id: req.params.id })
				.then((workshop) => {
					res.send(workshop);
				})
		})
})
router.delete("/:id", (req, res) => {
	workshop.deleteOne({ _id: req.params.id })
		.then(() => {
			res.send(true)
		})
})

export default router
