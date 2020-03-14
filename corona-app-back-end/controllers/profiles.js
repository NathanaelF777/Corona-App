const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.js')

router.get('/', (req, res) => {
  Profile.find({}, (err, foundProfiles) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundProfiles)
  })
})

router.post('/', (req, res) => {
  Profile.create(req.body, (error, createdProfile) => {
      console.log(createdProfile);
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).send(createdProfile) //  .json() will send proper headers in response so client knows it's json coming back
  })
})

router.put('/:id', (req, res) => {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProfile) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedProfile)
  })
})

router.delete('/:id', (req, res) => {
  Profile.findByIdAndRemove(req.params.id, (err, deletedProfile) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedProfile)
  })
})

module.exports = router
