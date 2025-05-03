"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const bhrrcService_js_1 = __importDefault(require("../services/bhrrcService.js"));
const filterService_js_1 = __importDefault(require("../services/filterService.js"));
exports.SearchController = {
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const searchTerm = (typeof query.query === "string") ? query.query : "";
            if (searchTerm === "") {
                res.status(400).send({ message: "Provide a correct search term" });
            }
            try {
                const bhrrc = yield bhrrcService_js_1.default.fetchBHRRC(searchTerm);
                const result = filterService_js_1.default.sortByRecent(bhrrc);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ message: "Guardian service failed" });
            }
        });
    }
};
