import dotenv from "dotenv";

// Load environment variables from .env file if available
dotenv.config();

export interface AppConfig {
  baseUrl: string;
  timeout: number;
  useMock: boolean;
  apiKey?: string;
  endpoints: {
    users: string;
    unknown: string;
    login: string;
    register: string;
  };
}

const rawBaseUrl = process.env.API_BASE_URL || "https://reqres.in/api";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

export const config: AppConfig = {
  baseUrl: cleanBaseUrl,
  timeout: Number(process.env.REQUEST_TIMEOUT) || 15000,
  useMock: process.env.USE_MOCK !== "false",
  apiKey: process.env.REQRES_API_KEY || process.env.API_KEY,
  endpoints: {
    users: `${cleanBaseUrl}/users`,
    unknown: `${cleanBaseUrl}/unknown`,
    login: `${cleanBaseUrl}/login`,
    register: `${cleanBaseUrl}/register`,
  },
};

export default config;
