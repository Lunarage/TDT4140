import {
    isoToDateList,
    toUpperCase,
    isIsoDate,
    isFutureDate,
    allDigits,
    parseIntWithUndefined,
} from "../functions";

describe("Testing functions", () => {
    test("toUpperCase test", () => {
        const value = toUpperCase("test");
        expect(value).toBe("Test");
    });

    test("isoToDateList test", () => {
        const value = isoToDateList("2020-02-02T20:20");
        expect(value).toStrictEqual(["2020", "02", "02", "20", "20"]);
    });

    test("isIsoDate test false", () => {
        const value = isIsoDate("not a Date");
        expect(value).toBeFalsy();
    });

    test("isIsoDate test true", () => {
        const value = isIsoDate("2020-02-02T20:20:20Z");
        expect(value).toBeTruthy();
    });

    test("isFutureDate test true", () => {
        const value = isFutureDate("2022-02-02T20:20:20Z");
        expect(value).toBeTruthy();
    });

    test("isFutureDate test false", () => {
        const value = isFutureDate("2002-02-02T20:20:20Z");
        expect(value).toBeFalsy();
    });

    test("allDigits test true", () => {
        const value = allDigits("65465");
        expect(value).toBeTruthy();
    });

    test("allDigits test false", () => {
        const value = allDigits("654g65");
        expect(value).toBeFalsy();
    });

    test("parseIntWithUndefined test", () => {
        const value = parseIntWithUndefined("65465");
        expect(value).toBe(65465);
    });
});
