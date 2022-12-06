const { model, Schema } = require("mongoose");

const qatarStarsDb = model('qatarStars', new Schema({
  _id: {type: String, required: true},
  matches: {type: Object, required: true}
}))

module.exports = {qatarStarsDb}