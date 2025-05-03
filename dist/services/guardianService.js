"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async fetchGuardian(term) {
        try {
            const response = await fetch(`https://content.guardianapis.com/search?q=${term}&api-key=test`);
            const result = await response.json();
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
