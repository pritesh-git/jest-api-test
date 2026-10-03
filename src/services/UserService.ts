import { AxiosResponse } from "axios";
import { RequestManager } from "../client/RequestManager";
import config from "../config/env";
import {
  CreateUserPayload,
  CreateUserResponse,
  PaginatedResponse,
  SingleResponse,
  UnknownResource,
  UpdateUserPayload,
  UpdateUserResponse,
  User,
} from "../types/models";

export class UserService {
  private readonly client: RequestManager;

  constructor(client?: RequestManager) {
    this.client = client || new RequestManager();
  }

  /**
   * Fetch paginated list of users
   */
  async getPageUsers(page: number = 1): Promise<AxiosResponse<PaginatedResponse<User>>> {
    return this.client.get<PaginatedResponse<User>>(`${config.endpoints.users}?page=${page}`);
  }

  /**
   * Fetch a single user by ID
   */
  async getSingleUser(userId: number): Promise<AxiosResponse<SingleResponse<User>>> {
    return this.client.get<SingleResponse<User>>(`${config.endpoints.users}/${userId}`);
  }

  /**
   * Fetch paginated list of unknown resources
   */
  async getListUsers(): Promise<AxiosResponse<PaginatedResponse<UnknownResource>>> {
    return this.client.get<PaginatedResponse<UnknownResource>>(config.endpoints.unknown);
  }

  /**
   * Fetch a single unknown resource by ID
   */
  async getUser(resourceId: number): Promise<AxiosResponse<SingleResponse<UnknownResource>>> {
    return this.client.get<SingleResponse<UnknownResource>>(
      `${config.endpoints.unknown}/${resourceId}`
    );
  }

  /**
   * Create a new user
   */
  async createUser(payload: CreateUserPayload): Promise<AxiosResponse<CreateUserResponse>> {
    return this.client.post<CreateUserResponse>(config.endpoints.users, payload);
  }

  /**
   * Update a user via PUT
   */
  async updateUser(
    userId: number,
    payload: UpdateUserPayload
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return this.client.put<UpdateUserResponse>(`${config.endpoints.users}/${userId}`, payload);
  }

  /**
   * Partially update a user via PATCH
   */
  async patchUser(
    userId: number,
    payload: UpdateUserPayload
  ): Promise<AxiosResponse<UpdateUserResponse>> {
    return this.client.patch<UpdateUserResponse>(`${config.endpoints.users}/${userId}`, payload);
  }

  /**
   * Delete a user by ID
   */
  async deleteUser(userId: number): Promise<AxiosResponse<void>> {
    return this.client.delete<void>(`${config.endpoints.users}/${userId}`);
  }
}

export default UserService;
