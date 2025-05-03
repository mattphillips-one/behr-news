"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_js_1 = require("../controllers/searchController.js");
const router = (0, express_1.Router)();
router.get('/', searchController_js_1.SearchController.search);
exports.default = router;
