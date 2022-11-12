import { config } from "dotenv"
config()

export const tokenBot = process.env.TOKEN_BOT
export const tokenFotball = process.env.FOTBALL
export const connectDb = process.env.CONNECT_DB