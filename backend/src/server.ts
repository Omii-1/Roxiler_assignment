import express, { Application } from "express"
import cors from "cors"
import * as dotenv from "dotenv"

import Database from "./db/data-source"

dotenv.config()

class App {

  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
  }

  protected plugins(): void {
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || "https://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-type", "Authorization"]
    }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

}

const startServer = async () => {

  const db = new Database()
  await db.connectToPostgres()

  const port = process.env.PORT || 6000
  const app = new App().app

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  })
}

startServer()