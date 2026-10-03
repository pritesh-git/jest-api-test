import { UserService } from "../../src/services/UserService";
import { RequestManager } from "../../src/client/RequestManager";

export default class getUsers {
  requestManagerInstance: RequestManager;
  private readonly userService: UserService;
  usersList: any;

  constructor() {
    this.requestManagerInstance = new RequestManager();
    this.userService = new UserService(this.requestManagerInstance);
    this.usersList = {};
  }

  async getSingleUser(userId: number) {
    try {
      this.usersList = await this.userService.getSingleUser(userId);
    } catch (error: any) {
      console.error(`Error occurred in getSingleUser: ${error?.message || error}`);
      throw error;
    }
    return this.usersList;
  }

  async getUser(userId: number) {
    try {
      this.usersList = await this.userService.getUser(userId);
    } catch (error: any) {
      console.error(`Error occurred in getUser: ${error?.message || error}`);
      throw error;
    }
    return this.usersList;
  }

  async getPageUsers(pageNumber: number) {
    try {
      this.usersList = await this.userService.getPageUsers(pageNumber);
    } catch (error: any) {
      console.error(`Error occurred in getPageUsers: ${error?.message || error}`);
      throw error;
    }
    return this.usersList;
  }

  async getListUsers() {
    try {
      this.usersList = await this.userService.getListUsers();
    } catch (error: any) {
      console.error(`Error occurred in getListUsers: ${error?.message || error}`);
      throw error;
    }
    return this.usersList;
  }
}
