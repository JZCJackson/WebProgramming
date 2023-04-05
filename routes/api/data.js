const express = require('express')
const router = express.Router()

// Import Person schema
const Shipwreck = require('./../../models/Shipwreck')

// post a new record
router.post('/', (req, res) => {

    const newShipwreck = Shipwreck({
        recrd: req.body.recrd,
        vesslterms: req.body.vesslterms,
        feature_type: req.body.feature_type,
        chart: req.body.chart,
        latdec: req.body.latdec,
        londec: req.body.londec,
        gp_quality: req.body.gp_quality,
        depth: req.body.depth,
        sounding_type: req.body.sounding_type,
        history: req.body.history,
        quasou: req.body.quasou,
        watlev: req.body.watlev,
        coordinates: req.body.coordinates
    })

    newShipwreck
        .save()
        .then(shipwreck => res.send(shipwreck))
        .catch(err => res.send(err))

})

// get by id
router.get('/:id', (req, res) => {
    Shipwreck
        .findOne({ _id: req.params.id })
        .then(shipwreck => res.send(shipwreck))
        .catch(err => res.status(500).send(err))
})

// update record
router.put('/:id', (req, res) => {
    Shipwreck.updateOne(
        { _id: req.params.id },
        {
            $set: {
                recrd: req.body.recrd,
                vesslterms: req.body.vesslterms,
                feature_type: req.body.feature_type,
                chart: req.body.chart,
                latdec: req.body.latdec,
                londec: req.body.londec,
                gp_quality: req.body.gp_quality,
                depth: req.body.depth,
                sounding_type: req.body.sounding_type,
                history: req.body.history,
                quasou: req.body.quasou,
                watlev: req.body.watlev,
                coordinates: req.body.coordinates
            }
        })
        .exec()
        .then(() => {
            res.status(201).send('Record Updated: ' + req.params.id)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = router