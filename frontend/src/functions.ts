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
