const express = require("express")
const router = express.Router()
const workshop = require("../models/workshops")

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
		.then((workshop) => {
			res.send(workshop)
		})
})

module.exports = router
