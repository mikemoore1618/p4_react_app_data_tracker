const
	express = require('express'),
	metricsRouter = new express.Router(),
	metricsCtrl = require('../controllers/metric.js'),
	{ verifyToken } = require('../serverAuth')

metricsRouter.use(verifyToken)
metricsRouter.get('/', metricsCtrl.index)
metricsRouter.get('/:id', metricsCtrl.show)

metricsRouter.use(verifyToken)
metricsRouter.post('/', metricsCtrl.create)
metricsRouter.patch('/:id', metricsCtrl.update)
metricsRouter.delete('/:id', metricsCtrl.destroy)

module.exports = metricsRouter