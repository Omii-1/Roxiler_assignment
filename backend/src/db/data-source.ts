import { DataSource } from "typeorm";
import "reflect-metadata"

class Database {

  public dataSource: DataSource | undefined

  private postgres_DB = process.env.POSTGRES_DB || ""
  private postgres_HOST = process.env.POSTGRES_HOST || ""
  private postgres_PORT = process.env.POSTGRES_PORT as unknown as number
  private postgres_USERNAME = process.env.POSTGRES_USERNAME as unknown as string
  private postgres_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string

  constructor(){
    this.connectToPostgres()
  }

  private async connectToPostgres() {
    this.dataSource = new DataSource({
      type: "postgres",
      database: this.postgres_DB,
      host: this.postgres_HOST,
      port: this.postgres_PORT,
      username: this.postgres_USERNAME,
      password: this.postgres_PASSWORD,
      // entities: [Photo],   // add models here
      synchronize: true,
      logging: false,
    })

    await this.dataSource.initialize().then(() => {
      console.log("PostgreSQL Connection has been established successfully.");      

    }).catch((error) => 
      console.log("Unable to connect to the postgreSQL database.", error)
    );
    
  }

}

export default Database