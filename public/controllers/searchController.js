"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const bhrrcService_js_1 = __importDefault(require("../services/bhrrcService.js"));
const filterService_js_1 = __importDefault(require("../services/filterService.js"));
exports.SearchController = {
    async search(req, res) {
        const { query } = req;
        const searchTerm = (typeof query.query === "string") ? query.query : "";
        if (searchTerm === "") {
            res.status(400).send({ message: "Provide a correct search term" });
        }
        try {
            const bhrrc = await bhrrcService_js_1.default.fetchBHRRC(searchTerm);
            const result = filterService_js_1.default.sortByRecent(bhrrc);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Guardian service failed" });
        }
    }
};
