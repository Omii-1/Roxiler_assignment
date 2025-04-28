import { AuthService } from "./auth.service";

export class Services {
  public authService: AuthService

  constructor(){
    this.authService = new AuthService()
  }
}

export let services: Services

export const initServices = () => {
  services = new Services()
}