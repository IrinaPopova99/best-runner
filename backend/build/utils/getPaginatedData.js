"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedData = void 0;
const getPaginatedData = (data, size, page) => {
    if (size && page) {
        return data.slice(size * (page - 1), size * page);
    }
    return data;
};
exports.getPaginatedData = getPaginatedData;
//# sourceMappingURL=getPaginatedData.js.map