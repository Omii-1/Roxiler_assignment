import { Request, Response } from "express";
import { Services } from "../services/service";
import { generateToken } from "../utils/jwt.util";

export class AuthController {

  private services: Services

  constructor(services: Services) {
    this.services = services
  }

  async signup(req:Request, res: Response){
    try {
      await this.services.authService.signup(req.body)
      res.status(201).json({message: "User registered successfully"})
    } catch (error: any) {
      res.status(400).json({ error: error.message})
    }
  }

  async signin(req: Request, res:Response){
    try{
      const { email, password} = req.body
      const user = await this.services.authService.signin(email, password)
      const token = generateToken({id: user.id, role: user.role})
      res.status(200).json( { token })
    } catch (error: any){
      res.status(400).json( {error: error.message})
    }
  }
}
