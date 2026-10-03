import deleteUser from "./apis/deleteUser";
import * as utils from "./utils";
import { StatusCode } from "../src/types/enums";

describe("DELETE User API Tests", () => {
  let deleteId: number;
  const deleteUserInstance = new deleteUser();

  beforeEach(() => {
    deleteId = utils.deleteUserId().id;
  });

  it("should return HTTP 204 No Content when deleting a user", async () => {
    const deleteResponse = await deleteUserInstance.deleteUser(deleteId);
    expect(deleteResponse.status).toBe(StatusCode.NO_CONTENT);
    expect(deleteResponse.statusText).toBe("No Content");
    expect(deleteResponse.data).toBe("");
  });

  it("should return an empty response body on successful deletion", async () => {
    const deleteResponse = await deleteUserInstance.deleteUser(deleteId);
    expect(deleteResponse.data).toBe("");
    expect(deleteResponse).toBeTruthy();
  });

  it("should not return 200, 201, or 400 on successful deletion", async () => {
    const deleteResponse = await deleteUserInstance.deleteUser(deleteId);
    expect(deleteResponse.status).not.toBe(StatusCode.OK);
    expect(deleteResponse.status).not.toBe(StatusCode.CREATED);
    expect(deleteResponse.status).not.toBe(StatusCode.BAD_REQUEST);
  });
});
