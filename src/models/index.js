import { model, Schema } from "mongoose";

export const qatarStarsDb = model('qatarStars', new Schema({
  _id: {type: String, required: true},
  matches: {type: Object, required: true}
}))