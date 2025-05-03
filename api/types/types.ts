export type NewsItem = {
    title: string,
    url: string,
    desc: string,
    pubDate: string,
    timestamp: number
}

export type NewsFeed = NewsItem[];