import http from "node:http";
import https from "node:https";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import config from "../config/env";
import { setupMockAdapter } from "../mock/setupMock";

const httpAgent = new http.Agent({ keepAlive: false });
const httpsAgent = new https.Agent({ keepAlive: false });

export class RequestManager {
  private readonly client: AxiosInstance;

  constructor(customConfig?: AxiosRequestConfig) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (config.apiKey) {
      headers["x-api-key"] = config.apiKey;
    }

    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      httpAgent,
      httpsAgent,
      headers,
      // In API testing, allow all HTTP status codes so assertions can verify error responses (4xx, 5xx)
      validateStatus: () => true,
      ...customConfig,
    });

    // If mock mode is enabled, bind mock adapter
    if (config.useMock) {
      setupMockAdapter(this.client);
    }
  }

  /**
   * Normalize response properties such as statusText
   */
  private normalizeResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    if (!response.statusText && response.status) {
      response.statusText = http.STATUS_CODES[response.status] || "";
    }
    return response;
  }

  /**
   * Generic request method supporting all HTTP verbs and typing
   */
  async request<T = any>(requestConfig: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.request<T>(requestConfig);
      return this.normalizeResponse(response);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return this.normalizeResponse(error.response as AxiosResponse<T>);
      }
      throw error;
    }
  }

  /**
   * HTTP GET method
   */
  async get<T = any>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...requestConfig,
      method: "GET",
      url,
    });
  }

  /**
   * HTTP POST method
   */
  async post<T = any>(
    url: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...requestConfig,
      method: "POST",
      url,
      data,
    });
  }

  /**
   * HTTP PUT method
   */
  async put<T = any>(
    url: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...requestConfig,
      method: "PUT",
      url,
      data,
    });
  }

  /**
   * HTTP PATCH method
   */
  async patch<T = any>(
    url: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...requestConfig,
      method: "PATCH",
      url,
      data,
    });
  }

  /**
   * HTTP DELETE method
   */
  async delete<T = any>(
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...requestConfig,
      method: "DELETE",
      url,
    });
  }

  // =========================================================================
  // Backwards-compatible methods preserving existing method signatures
  // =========================================================================

  async getRequest(url: string, _payload?: unknown): Promise<AxiosResponse<any>> {
    return this.get(url);
  }

  async postRequest(url: string, payload: unknown): Promise<AxiosResponse<any>> {
    return this.post(url, payload);
  }

  async putRequest(url: string, payload: unknown): Promise<AxiosResponse<any>> {
    return this.put(url, payload);
  }

  async deleteRequest(url: string, _payload?: unknown): Promise<AxiosResponse<any>> {
    return this.delete(url);
  }
}

export default RequestManager;
