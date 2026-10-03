/**
 * Standard User entity returned by ReqRes API
 */
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

/**
 * Standard resource entity (e.g. colors from /unknown)
 */
export interface UnknownResource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

/**
 * API Support metadata
 */
export interface SupportInfo {
  url: string;
  text: string;
}

/**
 * Single item API response wrapper
 */
export interface SingleResponse<T> {
  data: T;
  support?: SupportInfo;
  _meta?: Record<string, unknown>;
}

/**
 * Paginated API response wrapper
 */
export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
  support?: SupportInfo;
  _meta?: Record<string, unknown>;
}

/**
 * Payload for creating a new user
 */
export interface CreateUserPayload {
  name: string;
  job: string;
}

/**
 * Response received upon creating a user
 */
export interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
  _meta?: Record<string, unknown>;
}

/**
 * Payload for updating an existing user
 */
export interface UpdateUserPayload {
  name?: string;
  job?: string;
}

/**
 * Response received upon updating a user
 */
export interface UpdateUserResponse {
  name?: string;
  job?: string;
  updatedAt: string;
  _meta?: Record<string, unknown>;
}

/**
 * Payload for logging in
 */
export interface LoginPayload {
  email: string;
  password?: string;
}

/**
 * Response received upon successful login
 */
export interface LoginResponse {
  token: string;
  _meta?: Record<string, unknown>;
}

/**
 * Payload for registering a user
 */
export interface RegisterPayload {
  email: string;
  password?: string;
}

/**
 * Response received upon successful registration
 */
export interface RegisterResponse {
  id: number;
  token: string;
  _meta?: Record<string, unknown>;
}

/**
 * Error response structure
 */
export interface ApiErrorResponse {
  error: string;
  _meta?: Record<string, unknown>;
}

// Backwards-compatible interface aliases
export type loginInfo = LoginPayload;
export type registerInfo = RegisterPayload;
export type createInfo = CreateUserPayload;
export interface updateInfo {
  id: number;
  data: {
    name: string;
    job: string;
  };
}
