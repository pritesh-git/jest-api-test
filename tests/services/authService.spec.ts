import { AuthService } from "@src/services/AuthService";
import { StatusCode, UserData } from "@src/types/enums";

describe("AuthService Unit & Integration Tests", () => {
  let authService: AuthService;

  beforeAll(() => {
    authService = new AuthService();
  });

  describe("POST /login", () => {
    it("should authenticate user and return token on valid credentials", async () => {
      const response = await authService.login({
        email: UserData.EMAIL,
        password: UserData.PASSWORD,
      });

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data).toHaveProperty("token");
      expect(typeof response.data.token).toBe("string");
    });

    it("should return HTTP 400 when missing password", async () => {
      const response = await authService.login({
        email: UserData.EMAIL,
      });

      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect((response.data as any).error).toBe("Missing password");
    });
  });

  describe("POST /register", () => {
    it("should register successfully with predefined reqres credentials", async () => {
      const response = await authService.register({
        email: UserData.EMAIL,
        password: UserData.PASSWORD,
      });

      expect(response.status).toBe(StatusCode.OK);
      expect(response.data).toHaveProperty("id");
      expect(response.data).toHaveProperty("token");
    });

    it("should reject registration when password is not supplied", async () => {
      const response = await authService.register({
        email: UserData.EMAIL,
      });

      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect((response.data as any).error).toBe("Missing password");
    });
  });
});
