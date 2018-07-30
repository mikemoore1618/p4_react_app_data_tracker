const mongoose = require('mongoose')

const metricSchema = new mongoose.Schema({
    sleep: Number,
    stress: Number,
    mood: Number,
    meditation: Number,
    energy: Number,
    diet: Number,
    exercise: Number,
    createdAt: Date,
    _by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Metric = mongoose.model('Metric', metricSchema)
module.exports = Metric;