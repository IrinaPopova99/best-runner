"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredData = void 0;
const getFilteredData = (data, filter) => {
    if (filter) {
        return data.filter((item) => filter.includes(item.typeWorkout));
    }
    return data;
};
exports.getFilteredData = getFilteredData;
//# sourceMappingURL=getFilteredData.js.map