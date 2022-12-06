const { config } = require("dotenv")
config()

const tokenBot = process.env.TOKEN_BOT
const tokenFotball = process.env.FOTBALL
const connectDb = process.env.CONNECT_DB
const dimencionToken = process.env.DIMENSION_TOKEN

module.exports = {
  tokenBot,
  tokenFotball,
  connectDb,
  dimencionToken
}