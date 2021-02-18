import { toUpperCase } from "../functions";

describe("Testing functions", () => {
    test("toUpperCase test", () => {
        const value = toUpperCase("test");
        expect(value).toBe("Test");
    });
});
