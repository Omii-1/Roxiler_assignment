import express, { Application, Request, Response} from "express"
import cors from "cors"
import * as dotenv from "dotenv"

import { database } from "./config/data-source"
import { initServices } from "./services/service"
import { initControllers } from "./controllers/controller"
import AuthRouter from "./routes/auth.routes"

dotenv.config()

class App {

  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
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

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home")
    })
    this.app.use("/api/v1/auth", AuthRouter)
  } 

}

const startServer = async () => {

  await database.connectToPostgres()

  initServices()
  initControllers()

  const port = process.env.PORT || 6000
  const app = new App().app

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  })
}

startServer()