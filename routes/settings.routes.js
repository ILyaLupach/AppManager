const express = require("express")
const router = express.Router()
const User = require('../models/user')

router.post("/password", (req, res) => {
	res.send(req.body.password === '123456')
})

router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
})

router.put("/users/:id", async (req, res) => {
	try {
		await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
		const newUser = await User.findOne({ _id: req.params.id })
		res.send(newUser)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

router.delete("/users/:id", async (req, res) => {
	try {
		const res = await User.deleteOne({ _id: req.params.id })
		res.send(res)
	} catch (error) {
		res.status(500).json({ message: 'server error' })
	}
})

module.exports = router
