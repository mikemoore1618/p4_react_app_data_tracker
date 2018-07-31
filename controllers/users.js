const
	User = require('../models/User.js'),
	{ signToken } = require('../serverAuth.js')

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			console.log(err)
			if (err) return res.json({ message: "ERROR", payload: null, code: err.code });
			res.json({ message: "SUCCESS", payload: users })
		})
	},

	// get one user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) return res.json({ message: "ERROR", payload: null, code: err.code })
			res.json({ message: "SUCCESS", payload: user })
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if (err) return res.json({ message: "ERROR", payload: null, code: err.code })
			const token = signToken(user)
			res.json({ message: "SUCCESS", payload: token })
		})
	},

	// update an existing user
	update: (req, res) => {
		if (!req.body.password) delete req.body.password
		Object.assign(req.user, req.body)
		req.user.save((err, updatedUser) => {
			if (err) return res.json({ message: "ERROR", payload: null, code: err.code })
			//create new token
			const token = signToken(updatedUser)
			res.json({ message: "SUCCESS", payload: token })
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		req.user.remove((err, user) => {
			if (err) return res.json({ message: "ERROR", payload: null, code: err.code })
			res.json({ message: "SUCCESS", payload: user })
		})
	},

	authenticate: (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return res.json({ message: 'error', payload: null, code: err.code })
			if (!user || !user.validPassword(req.body.password)) {
				return res.json({ message: 'error', payload: null, error: 'invalid credentials' })
			}
			const token = signToken(user)
			res.json({ message: 'success', payload: token })
		})
	}
}