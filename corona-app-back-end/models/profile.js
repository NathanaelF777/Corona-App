const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  name: {type: String, default: 'Anonymous'},
  age: {type: Number},
  gender: String,
  location: String,
  symptoms: [{type: String}],
  tested: Boolean,
  diagnosed: Boolean,
  condition: {type: Boolean}
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema)
