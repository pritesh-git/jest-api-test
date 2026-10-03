import loginUser from "./apis/loginUser";
import * as utils from "./utils";
import { StatusCode } from "../src/types/enums";
import { LoginPayload } from "../src/types/models";

describe("POST Login API Tests", () => {
  let loginData: LoginPayload;
  const loginUserInstance = new loginUser();

  beforeAll(() => {
    loginData = utils.loginInfo();
  });

  it("should return HTTP 200 OK and statusText 'OK' on successful login", async () => {
    const result = await loginUserInstance.login(loginData);
    expect(result.status).toBe(StatusCode.OK);
    expect(result.statusText).toBe("OK");
  });

  it("should return an authentication token upon successful login", async () => {
    const result = await loginUserInstance.login(loginData);
    expect(result.data).not.toBeNull();
    expect(result.data).toBeInstanceOf(Object);
    expect(result.data).toHaveProperty("token");
    expect(typeof result.data.token).toBe("string");
    expect(result.data.token.length).toBeGreaterThan(0);
  });

  it("should return HTTP 400 Bad Request when password is missing", async () => {
    const invalidPayload: LoginPayload = { email: loginData.email };
    const result = await loginUserInstance.login(invalidPayload);
    expect(result.status).toBe(StatusCode.BAD_REQUEST);
    expect(result.data).toHaveProperty("error");
  });
});
