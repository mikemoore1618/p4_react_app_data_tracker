const 
	Metric = require('../models/Metric.js')


module.exports = {
	// show all metrics
	index: (req, res) => {
		Metric.find({}, (err, metrics) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: metrics})
		})
	},

	// get one metric
	show: (req, res) => {
		Metric.findById(req.params.id, (err, metric) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: metric })
		})
	},

	// create a new metric
	create: (req, res) => {
		Metric.create({ ...req.body, _by: req.user._id }, (err, metric) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: metric })
		})
	},

	// update an existing metric
	update: (req, res) => {
        Metric.findByIdAndUpdate(req.params.id, req.body, (err, updateMetric) => {
        	if(err) return res.json({message: "ERROR", payload: null, code: err.code})
        	res.json({ message: "SUCCESS", payload: updateMetric })
        })
    },

	// delete an existing metric
	destroy: (req, res) => {
		Metric.findByIdAndRemove(req.params.id, (err, deletedMetric) => {
			if(err) return res.json({message: "ERROR", err})
			res.json({ message: "SUCCESS", payload: deletedMetric })
		})
	},
}

