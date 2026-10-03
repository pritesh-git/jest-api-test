import { AuthService } from "../../src/services/AuthService";
import { RequestManager } from "../../src/client/RequestManager";
import { LoginPayload } from "../../src/types/models";

export default class loginUsers {
  requestManagerInstance: RequestManager;
  private readonly authService: AuthService;
  loginResponse: any;

  constructor() {
    this.requestManagerInstance = new RequestManager();
    this.authService = new AuthService(this.requestManagerInstance);
    this.loginResponse = {};
  }

  async login(loginData: LoginPayload) {
    try {
      this.loginResponse = await this.authService.login(loginData);
    } catch (error: any) {
      console.error(`Error occurred in login: ${error?.message || error}`);
      throw error;
    }
    return this.loginResponse;
  }
}
