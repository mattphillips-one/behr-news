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
const rss_parser_1 = __importDefault(require("rss-parser"));
exports.default = {
    filterBHRRC(item) {
        return (item.title.toLowerCase().includes("response")
            || item.title.toLocaleLowerCase().includes("respond")
            || item.content.toLowerCase().includes("response")
            || item.content.toLowerCase().includes("respond"));
    },
    // takes json-parsed response and parses it to create NewsFeed type
    // filter set to true will filter results from parsed list
    parseBHRRC(bhrrcFeed, filter) {
        const results = bhrrcFeed.items; // search results under 'items'
        var items = [];
        // extracting news items and adding to items array
        for (const [k, v] of Object.entries(results)) {
            const item = v;
            if (filter) {
                if (this.filterBHRRC(item)) {
                    continue;
                }
            }
            const newsItem = {
                title: item.title,
                url: item.link,
                desc: item.content || item.contentSnippet || "",
                pubDate: item.pubDate,
                timestamp: Date.parse(item.isoDate)
            };
            items.push(newsItem);
        }
        return items;
    },
    // Fetches RSS feed, parses it, 
    fetchBHRRC(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new rss_parser_1.default();
            const url = `https://www.business-humanrights.org/en/feeds/latest-news/3/?&search=${term}&language=en`;
            try {
                const feed = yield parser.parseURL(url);
                const parsedFeed = this.parseBHRRC(feed, true); // filter manually for now
                return parsedFeed;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
