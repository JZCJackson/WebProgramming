const express = require('express')
const router = express.Router()

// const app = express()
// // middleware for bodyparser
// app.use(express.urlencoded({ extended: true }));

// Import Person schema
const Shipwreck = require('./../../models/Shipwreck')

// Add new Shipwreck record
// [POST] http://localhost:8000/api/data/
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
        .then(shipwreck => res.status(201).send(shipwreck))
        .catch(err => res.status(500).send(err))

})

// get Shipwreck records by certain page, perPage, and depth
// [GET] http://localhost:8000/api/data/
router.get('/', (req, res) => {
    const page = req.query.page
    const perPage = req.query.perPage
    const depth = req.query.depth

    const query = Shipwreck.find({})

    if (depth) {
        query.where('depth').equals(depth)
    }

    query.skip((page - 1) * perPage).limit(perPage)
        .then(shipwrecks => res.status(200).send(shipwrecks))
        .catch(err => res.status(500).send(err))
})

// Get Shipwreck record by id
// [GET] http://localhost:8000/api/data/:id
router.get('/:id', (req, res) => {
    Shipwreck
        .findOne({ _id: req.params.id })
        .then(shipwreck => res.status(200).send(shipwreck))
        .catch(err => res.status(500).send(err))
})

// router.get('/:id', async (req, res) => {
//     const shipwreck = await Shipwreck.findOne({ _id: req.params.id })
//      try {
//         res.status(200).render(
//             'singleData',
//             {
//                 data: shipwreck
//             }
//         )
//         console.print(shipwreck)
//      } catch (err) {
//         res.status(500).send(err)
//      }
// })

// Update Shipwreck record by id
// [PUT] http://localhost:8000/api/data/:id
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
            res.status(200).send('Record Updated: ' + req.params.id)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

// Delete Shipwreck record by id
// [DELETE] http://localhost:8000/api/data/:id
router.delete('/:id', (req, res) => {
    Shipwreck.deleteOne({_id: req.params.id})
        .exec()
        .then(() => {
            res.status(200).send('Record Deleted: ' + req.params.id)
        })
        .catch((err) => { 
            res.status(500).send(err)
        })
})

module.exports = router