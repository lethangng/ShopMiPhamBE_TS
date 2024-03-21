"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseData = (errCode, message, error, data) => {
    const res = {
        errCode,
        message,
        errors: error,
        data,
    };
    return res;
};
exports.default = {
    ResponseData,
};
//# sourceMappingURL=Helper.js.map