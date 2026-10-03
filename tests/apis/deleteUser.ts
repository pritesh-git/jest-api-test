import { UserService } from "../../src/services/UserService";
import { RequestManager } from "../../src/client/RequestManager";

export default class deleteUser {
  requestManagerInstance: RequestManager;
  private readonly userService: UserService;
  deleteResponse: any;

  constructor() {
    this.requestManagerInstance = new RequestManager();
    this.userService = new UserService(this.requestManagerInstance);
    this.deleteResponse = {};
  }

  async deleteUser(userId: number | string) {
    try {
      this.deleteResponse = await this.userService.deleteUser(Number(userId));
    } catch (error: any) {
      console.error(`Error occurred in delete user: ${error?.message || error}`);
      throw error;
    }
    return this.deleteResponse;
  }
}
