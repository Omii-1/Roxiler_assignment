import { DataSource } from "typeorm";
import "reflect-metadata"
import { User } from "../models/user.model";
import { Store } from "../models/store.model";
import { Rating } from "../models/rating.model";

class Database {

  public dataSource: DataSource | undefined

  constructor(){
  }

  public async connectToPostgres() {
    this.dataSource = new DataSource({
      type: "postgres",
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD ,
      entities: [User, Store, Rating], 
      synchronize: process.env.NODE_ENV !== "prod",
      logging: false,
    })

    await this.dataSource.initialize().then(() => {
      console.log("PostgreSQL Connection has been established successfully");      

    }).catch((error) => 
      console.log("Unable to connect to the postgreSQL database.", error)
    );
    
  }

  public getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error("DataSource has not been initialized. Call connectToPostgres() first.");
    }
    return this.dataSource
  }

}

export const database = new Database()