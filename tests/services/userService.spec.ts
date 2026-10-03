import { UserService } from "@src/services/UserService";
import { StatusCode } from "@src/types/enums";
import * as fixtures from "../utils";

describe("UserService Unit & Integration Tests", () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  describe("GET /users", () => {
    it("should fetch paginated users list with metadata", async () => {
      const response = await userService.getPageUsers(1);

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data.page).toBe(1);
      expect(response.data.per_page).toBeGreaterThan(0);
      expect(response.data.total).toBeGreaterThan(0);
      expect(Array.isArray(response.data.data)).toBe(true);

      const [firstUser] = response.data.data;
      expect(firstUser).toHaveProperty("id");
      expect(firstUser).toHaveProperty("email");
      expect(firstUser).toHaveProperty("first_name");
      expect(firstUser).toHaveProperty("last_name");
    });

    it("should fetch a specific user by ID", async () => {
      const userId = 2;
      const response = await userService.getSingleUser(userId);

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data.data.id).toBe(userId);
      expect(response.data.data.email).toBeDefined();
    });

    it("should return HTTP 404 for a non-existent user", async () => {
      const nonExistentId = 99999;
      const response = await userService.getSingleUser(nonExistentId);

      expect(response.status).toBe(StatusCode.NOT_FOUND);
    });
  });

  describe("POST /users", () => {
    it("should create a user with generated test data", async () => {
      const payload = fixtures.createInfo();
      const response = await userService.createUser(payload);

      expect(response.status).toBe(StatusCode.CREATED);
      expect(response.data.name).toBe(payload.name);
      expect(response.data.job).toBe(payload.job);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeDefined();
    });
  });

  describe("PUT & PATCH /users/:id", () => {
    it("should completely update user details via PUT", async () => {
      const userId = 2;
      const payload = { name: "Neo", job: "The One" };
      const response = await userService.updateUser(userId, payload);

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data.name).toBe(payload.name);
      expect(response.data.job).toBe(payload.job);
      expect(response.data.updatedAt).toBeDefined();
    });

    it("should partially update user details via PATCH", async () => {
      const userId = 2;
      const payload = { job: "Lead Architect" };
      const response = await userService.patchUser(userId, payload);

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data.job).toBe(payload.job);
      expect(response.data.updatedAt).toBeDefined();
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete an existing user and return 204", async () => {
      const userId = 2;
      const response = await userService.deleteUser(userId);

      expect(response.status).toBe(StatusCode.NO_CONTENT);
      expect(response.data).toBe("");
    });
  });
});
