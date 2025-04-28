import { AuthController } from "./auth.controller";
import { services, Services } from "../services/service";

export class Controllers {
  public authController: AuthController;

  constructor(services: Services) {
    this.authController = new AuthController(services);
  }
}

export let controllers: Controllers;

export const initControllers = () => {
  controllers = new Controllers(services);
};
