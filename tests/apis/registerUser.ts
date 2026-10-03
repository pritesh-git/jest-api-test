import { AuthService } from "../../src/services/AuthService";
import { UserService } from "../../src/services/UserService";
import { RequestManager } from "../../src/client/RequestManager";
import { CreateUserPayload, RegisterPayload } from "../../src/types/models";

export default class registerUsers {
  requestManagerInstance: RequestManager;
  private readonly authService: AuthService;
  private readonly userService: UserService;
  registerResponse: any;

  constructor() {
    this.requestManagerInstance = new RequestManager();
    this.authService = new AuthService(this.requestManagerInstance);
    this.userService = new UserService(this.requestManagerInstance);
    this.registerResponse = {};
  }

  async register(registerData: RegisterPayload) {
    try {
      this.registerResponse = await this.authService.register(registerData);
    } catch (error: any) {
      console.error(`Error occurred in register: ${error?.message || error}`);
      throw error;
    }
    return this.registerResponse;
  }

  async createUser(userData: CreateUserPayload) {
    try {
      this.registerResponse = await this.userService.createUser(userData);
    } catch (error: any) {
      console.error(`Error occurred in createUser: ${error?.message || error}`);
      throw error;
    }
    return this.registerResponse;
  }
}
