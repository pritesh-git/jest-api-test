import getUser from "./apis/getUser";
import { PageNumber, StatusCode } from "../src/types/enums";
import * as utils from "./utils";

describe("GET Users API Tests", () => {
  const getUserInstance = new getUser();

  // ======================================== MULTI USER API ==============================================
  describe("Get Users with Pagination", () => {
    let firstPage: number;
    let secondPage: number;

    beforeAll(() => {
      firstPage = PageNumber.FIRST;
      secondPage = PageNumber.SECOND;
    });

    it("should return HTTP 200 OK for page 1", async () => {
      const result = await getUserInstance.getPageUsers(firstPage);
      expect(result.status).toBe(StatusCode.OK);
      expect(result.status).not.toBe(StatusCode.BAD_REQUEST);
    });

    it("should return an array of users for page 2", async () => {
      const result = await getUserInstance.getPageUsers(secondPage);
      expect(Array.isArray(result.data.data)).toBe(true);
      expect(result.data.data.length).toBeGreaterThan(0);

      result.data.data.forEach((element: unknown) => {
        expect(element).toBeInstanceOf(Object);
        expect(element).toHaveProperty("id");
        expect(element).toHaveProperty("email");
      });
    });

    it("should return a list of users with length greater than 5", async () => {
      const result = await getUserInstance.getPageUsers(firstPage);
      expect(result.data.data.length).toBeGreaterThan(1);
      expect(result.data.data.length).toBeGreaterThan(3);
      expect(result.data.data.length).toBeGreaterThan(5);
    });

    it("should not return a null or empty data list", async () => {
      const result = await getUserInstance.getPageUsers(secondPage);
      expect(result.data.data).not.toBeNull();
      expect(result.data.data).toBeDefined();
      expect(result.data.data.length).toBeGreaterThan(0);
    });
  });

  // ======================================== MULTI UNKNOWN RESOURCE API ==============================================
  describe("Get List of Unknown Resources", () => {
    it("should return HTTP 200 OK for resource list", async () => {
      const result = await getUserInstance.getListUsers();
      expect(result.status).toBe(StatusCode.OK);
      expect(result.status).not.toBe(StatusCode.BAD_REQUEST);
    });

    it("should return an array of resources", async () => {
      const result = await getUserInstance.getListUsers();
      expect(Array.isArray(result.data.data)).toBe(true);

      result.data.data.forEach((element: unknown) => {
        expect(element).toBeInstanceOf(Object);
        expect(element).toHaveProperty("id");
        expect(element).toHaveProperty("name");
        expect(element).toHaveProperty("color");
      });
    });

    it("should not return a null resource array", async () => {
      const result = await getUserInstance.getListUsers();
      expect(result.data.data).not.toBeNull();
      expect(result.data.data).toBeDefined();
    });
  });

  // ============================================ SINGLE USER API ================================================
  describe("Get Single User by ID", () => {
    let userId: number;

    beforeEach(() => {
      userId = utils.getUserId().id;
    });

    it("should return HTTP 200 OK for an existing single user", async () => {
      const result = await getUserInstance.getSingleUser(userId);
      expect(result.status).toBe(StatusCode.OK);
      expect(result.data.data).toBeDefined();
      expect(result.data.data.id).toBe(userId);
    });

    it("should not return 400 Bad Request for valid user ID query", async () => {
      const result = await getUserInstance.getSingleUser(userId);
      expect(result.status).not.toBe(StatusCode.BAD_REQUEST);
    });
  });

  // ============================================ SINGLE UNKNOWN RESOURCE API ====================================
  describe("Get Single Unknown Resource", () => {
    let resourceId: number;

    beforeEach(() => {
      resourceId = utils.getUserId().id;
    });

    it("should return HTTP 200 OK for a valid resource ID", async () => {
      const result = await getUserInstance.getUser(resourceId);
      expect(result.status).toBe(StatusCode.OK);
      expect(result.data.data).toBeDefined();
    });

    it("should not return 400 Bad Request", async () => {
      const result = await getUserInstance.getUser(resourceId);
      expect(result.status).not.toBe(StatusCode.BAD_REQUEST);
    });

    it("should return non-empty valid resource object", async () => {
      const result = await getUserInstance.getUser(resourceId);
      expect(result.data.data).toBeDefined();
      expect(result.data.data).not.toBeNull();
      expect(typeof result.data.data).toBe("object");
      expect(result.data.data).toHaveProperty("id");
    });
  });
});
