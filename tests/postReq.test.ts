import registerUser from "./apis/registerUser";
import * as utils from "./utils";
import { StatusCode } from "../src/types/enums";
import { CreateUserPayload } from "../src/types/models";

describe("POST Create User API Tests", () => {
  let createData: CreateUserPayload;
  const registerUserInstance = new registerUser();

  beforeEach(() => {
    createData = utils.createInfo();
  });

  it("should return HTTP 201 Created when creating a user", async () => {
    const result = await registerUserInstance.createUser(createData);
    expect(result.status).toBe(StatusCode.CREATED);
    expect(result.status).not.toBe(StatusCode.BAD_REQUEST);
  });

  it("should return statusText 'Created'", async () => {
    const result = await registerUserInstance.createUser(createData);
    expect(result.statusText).toBe("Created");
    expect(result.statusText).not.toBe("");
  });

  it("should return a created user object with id and createdAt timestamp", async () => {
    const result = await registerUserInstance.createUser(createData);
    expect(result.data).toBeInstanceOf(Object);
    expect(result.data).toHaveProperty("id");
    expect(result.data).toHaveProperty("name", createData.name);
    expect(result.data).toHaveProperty("job", createData.job);
    expect(result.data).toHaveProperty("createdAt");
    expect(Number.isNaN(Date.parse(result.data.createdAt))).toBe(false);
  });
});
