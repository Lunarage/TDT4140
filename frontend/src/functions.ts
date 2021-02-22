export const toUpperCase = (s: string | null) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const isoToDayMonthYear = (date: string) => {
    if (!date) {
        return [false];
    }
    const list = date.split("T")[0].split("-");
    return list;
};
