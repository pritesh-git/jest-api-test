/**
 * Standard HTTP Status Codes used across API tests
 */
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

// Backwards-compatible alias for existing code
export const statusCode = StatusCode;

/**
 * Common test user credentials and constants
 */
export const UserData = {
  ID: 3,
  EMAIL: "eve.holt@reqres.in",
  PASSWORD: "cityslicka",
  NAME: "RONY",
  JOB: "tester",
} as const;

export type UserDataType = typeof UserData;

// Backwards-compatible alias for existing code
export const userData = UserData;

/**
 * Common pagination test fixtures
 */
export const PageNumber = {
  FIRST: 1,
  SECOND: 2,
  INVALID: 30,
} as const;

export type PageNumberType = typeof PageNumber;

// Backwards-compatible alias for existing code
export const pageNumber = PageNumber;
