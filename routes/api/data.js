const express = require('express')
const router = express.Router()
const passport = require('passport');
const jsonwt = require('jsonwebtoken');

const settings = require('../../config/settings');

// Import Person schema
const Shipwreck = require('./../../models/Shipwreck')

// Add new Shipwreck record
// [POST] http://localhost:8000/api/data/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

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
        // coordinates: req.body.coordinates
        coordinates: [req.body.londec, req.body.latdec]
    })

    newShipwreck
        .save()
        .then(shipwreck => res.status(201).send(shipwreck))
        .catch(err => res.status(500).send(err))

})

// get Shipwreck records by certain page, perPage, and depth
// [GET] http://localhost:8000/api/data/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

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
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

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
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

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
                // coordinates: req.body.coordinates
                coordinates: [req.body.londec, req.body.latdec]
            }
        })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'Record Updated: ' + req.params.id });
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

// Delete Shipwreck record by id
// [DELETE] http://localhost:8000/api/data/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Shipwreck.deleteOne({_id: req.params.id})
        .exec()
        .then(() => {
            res.status(200).json({ message:'Record Deleted: ' + req.params.id});
        })
        .catch((err) => { 
            res.status(500).send(err)
        })
})

// render pages
router.get('/team6/get', (req, res) => {
    res.render("getData", {})
})

router.get('/team6/add', (req, res) => {
    res.render("addData", {})
})

router.get('/team6/search', (req, res) => {
    res.render("searchData", {})
})

router.get('/team6/update', (req, res) => {
    res.render("updateData", {})
})

router.get('/team6/delete', (req, res) => {
    res.render("deleteData", {})
})

module.exports = router