export const toUpperCase = (s: string | null) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const isoToDateList = (date: string) => {
    if (!date) {
        return [false];
    }
    const [long, short] = date.split("T");
    const longList = long.split("-");
    const shortList = short.split(":");
    const dateList = longList.concat(shortList);
    return dateList;
};

export const isFutureIsoDate = (str: string) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(str)) return false;
    const date_seconds = Date.parse(str);
    if (!date_seconds) return false;
    return true;
};

export const isFutureDate = (str: string) => {
    const date = new Date(str);
    const now = new Date();
    if (date < now) return false;
    return true;
};

export const allDigits = (str: string | undefined) => {
    if (!str || /^\d+$/.test(str)) return true;
    return false;
};

export const parseIntWithUndefined = (str: string | undefined) => {
    if (!str) return undefined;
    return parseInt(str);
};
