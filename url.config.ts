import { config } from "./src/config/env";

export const userUrl = config.endpoints.users;
export const unknownUrl = config.endpoints.unknown;
export const loginUrl = config.endpoints.login;
export const registerUrl = config.endpoints.register;

export default {
  userUrl,
  unknownUrl,
  loginUrl,
  registerUrl,
};

// CommonJS compatibility for any legacy require calls
module.exports = {
  userUrl,
  unknownUrl,
  loginUrl,
  registerUrl,
};
