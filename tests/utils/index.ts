import { Chance } from "chance";
import { UserData } from "../../src/types/enums";
import {
  CreateUserPayload,
  LoginPayload,
  RegisterPayload,
  updateInfo as UpdateInfoInterface,
} from "../../src/types/models";

export const chance = new Chance();

/**
 * Valid test credentials for login
 */
export const loginInfo = (): LoginPayload => {
  return {
    email: UserData.EMAIL,
    password: UserData.PASSWORD,
  };
};

/**
 * Random user credentials for registration tests
 */
export const registerInfo = (): RegisterPayload => {
  return {
    email: chance.email({ domain: "reqres.in" }),
    password: chance.word(),
  };
};

/**
 * Random user data for user creation
 */
export const createInfo = (): CreateUserPayload => {
  return {
    name: chance.name(),
    job: chance.string({ length: 5, casing: "upper", alpha: true }),
  };
};

/**
 * Random user data for user updates
 */
export const updateInfo = (): UpdateInfoInterface => {
  return {
    id: UserData.ID,
    data: {
      name: chance.name(),
      job: chance.string({ length: 5, casing: "upper", alpha: true }),
    },
  };
};

/**
 * Random user ID for delete tests
 */
export const deleteUserId = (): { id: number } => {
  return {
    id: chance.integer({ min: 1, max: 10 }),
  };
};

/**
 * Random user ID for get user tests
 */
export const getUserId = (): { id: number } => {
  return {
    id: chance.integer({ min: 1, max: 10 }),
  };
};

// Aliases for modern test naming conventions
export const createUserData = createInfo;
export const updateUserData = updateInfo;
export const validLoginCredentials = loginInfo;
export const randomRegisterCredentials = registerInfo;
export const getRandomUserId = (): number => chance.integer({ min: 1, max: 10 });
