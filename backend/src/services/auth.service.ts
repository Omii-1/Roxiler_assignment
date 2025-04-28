import { database } from "../config/data-source"
import {User} from "../models/user.model"
import bcrypt from "bcryptjs"

export class AuthService {

  private userRepository = database.getDataSource().getRepository(User)

  async signup(data: {name: string, email: string, password: string, address: string,},){

      const existingUser = await this.userRepository.findOne({where: {email: data.email}})
  
      if(existingUser) throw new Error("Email already Registered")
  
      const hashedPassword = await bcrypt.hash(data.password, 10)
  
      const user = this.userRepository.create({...data, password: hashedPassword})
  
      await this.userRepository.save(user)
  
      return user

  }

  async signin(email: string, password: string){

    const user = await this.userRepository.findOne({where: {email}})
    if(!user) throw new Error("Invalid credentials")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Invalid credentials")

    return user;
  }

}


