const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShipwreckSchema = new Schema({
    recrd: {
        type: String
    },
    vesslterms: {
        type: String
    },
    feature_type: {
        type: String,
        required: true
    },
    chart: {
        type: String,
        required: true
    },
    latdec: {
        type: Number,
        required: true
    },
    londec: {
        type: Number,
        required: true
    },
    gp_quality: {
        type: String
    },
    depth: {
        type: Number,
        required: true
    },
    sounding_type: {
        type: String
    },
    history: {
        type: String
    },
    quasou: {
        type: String
    },
    watlev: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
})

module.exports = Shipwreck = mongoose.model('Shipwreck', ShipwreckSchema)