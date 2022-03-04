import { NameService } from "./Name.service";

describe("NameService", () => {
  const nameService = () => new NameService();

  describe("getName", () => {
    it("should resolve with valid input", () => {
      const nameDetails = {
        name: "test123",
      };
      const service = nameService();
      expect(service.getName(nameDetails)).resolves.toHaveProperty(
        "fullName",
        "test123"
      );
    });
  });
});
