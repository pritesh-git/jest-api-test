import { UserService } from "../../src/services/UserService";
import { RequestManager } from "../../src/client/RequestManager";
import { UpdateUserPayload } from "../../src/types/models";

export default class updateUser {
  requestManagerInstance: RequestManager;
  private readonly userService: UserService;
  updateResponse: any;

  constructor() {
    this.requestManagerInstance = new RequestManager();
    this.userService = new UserService(this.requestManagerInstance);
    this.updateResponse = {};
  }

  async updateInfo(userId: number, updateData: UpdateUserPayload) {
    try {
      this.updateResponse = await this.userService.updateUser(userId, updateData);
    } catch (error: any) {
      console.error(`Error occurred in updateInfo: ${error?.message || error}`);
      throw error;
    }
    return this.updateResponse;
  }
}
