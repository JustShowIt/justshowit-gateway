"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    convertParamsToRunData(params) {
        let paramsList = {};
        if (typeof params === 'object') {
            Object.keys(params).forEach(key => {
                paramsList[key] = 1;
            });
        }
        return paramsList;
    }
};
//# sourceMappingURL=analyze-utils.js.map