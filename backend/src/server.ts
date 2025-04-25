import express, {Application} from "express"
import cors from "cors"
import * as dotenv from "dotenv"

import Database from "./db/data-source"

dotenv.config()

class App {

  public app : Application

  constructor() {
    this.app = express()
    this.plugins()
    this.databaseSync()
  }

  protected plugins(): void {
    this.app.use(cors({
      origin: "https://locahost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-type", "Authorization"]
    }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
  }

  protected databaseSync(): void {
    const db = new Database()
  }

}

const port = process.env.PORT || 6000
const app = new App().app

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})