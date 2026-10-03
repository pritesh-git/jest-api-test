import updateUser from "./apis/updateUser";
import * as utils from "./utils";
import { StatusCode } from "../src/types/enums";
import { UpdateUserPayload } from "../src/types/models";

describe("PUT/UPDATE User API Tests", () => {
  let userId: number;
  let updateData: UpdateUserPayload;
  const updateUserInstance = new updateUser();

  beforeAll(() => {
    const info = utils.updateInfo();
    userId = info.id;
    updateData = info.data;
  });

  it("should return HTTP 200 OK when updating user information", async () => {
    const result = await updateUserInstance.updateInfo(userId, updateData);
    expect(result.status).toBe(StatusCode.OK);
  });

  it("should not return a null response body", async () => {
    const result = await updateUserInstance.updateInfo(userId, updateData);
    expect(result.data).not.toBeNull();
    expect(result.data).toBeDefined();
  });

  it("should return updated fields and a valid ISO updatedAt timestamp", async () => {
    const result = await updateUserInstance.updateInfo(userId, updateData);
    expect(result.data).toBeInstanceOf(Object);
    expect(result.data).toHaveProperty("name", updateData.name);
    expect(result.data).toHaveProperty("job", updateData.job);
    expect(result.data).toHaveProperty("updatedAt");
    expect(Number.isNaN(Date.parse(result.data.updatedAt))).toBe(false);
  });
});
