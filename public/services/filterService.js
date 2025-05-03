"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sortByRecent(feed) {
        // sorts items by date in descending order (recent first)
        feed.sort((a, b) => {
            const aDate = Date.parse(a.pubDate);
            const bDate = Date.parse(b.pubDate);
            return (bDate - aDate); // reverse order
        });
        return feed;
    }
};
