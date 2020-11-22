const { RESTDataSource } = require('apollo-datasource-rest');

class RedditAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://www.reddit.com/';
    }

    subredditReducer(subreddit){
        return {
            id: subreddit.id || 0,
            name: subreddit.display_name || "",
            date: subreddit.created_utc,
            title: subreddit.title,
            description: subreddit.public_description, // public_description_html
            header: subreddit.banner_img,
            icon: subreddit.icon_img,
            color: subreddit.primary_color
        }
    }

    async searchSubreddits({keyword, limit, sort, time, after}) { // sort one of (relevance, hot, top, new, comments)
        let keywordVal = keyword || ""
        let limitVal = limit
        let sortVal = sort
        let timeVal = time
        console.log(keyword, limit, sort, time)
        let url = `search.json?q=${keywordVal}&type=sr${limitVal && '&limit='+limitVal  || ""}${sortVal && '&sort='+sortVal || ""}${timeVal && '&t='+timeVal || ""}`
        console.log(url)
        const response = await this.get(url)
        let subs = response.data.children
        //console.log(subs.length, subs[0].data.display_name, this.subredditReducer(subs[0].data))
        return Array.isArray(subs) ? subs.map(sub => this.subredditReducer(sub.data)) : [];
    }
}

module.exports = RedditAPI;
