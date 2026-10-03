import { AxiosResponse } from "axios";
import { RequestManager } from "../client/RequestManager";
import config from "../config/env";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../types/models";

export class AuthService {
  private readonly client: RequestManager;

  constructor(client?: RequestManager) {
    this.client = client || new RequestManager();
  }

  /**
   * Log in user
   */
  async login(payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
    return this.client.post<LoginResponse>(config.endpoints.login, payload);
  }

  /**
   * Register a new user
   */
  async register(payload: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> {
    return this.client.post<RegisterResponse>(config.endpoints.register, payload);
  }
}

export default AuthService;
