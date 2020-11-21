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
            icon: subreddit.icon_img
        }
    }

    async searchSubreddits({keyword, limit, after}) {
        let keywordVal = keyword || ""
        let limitVal = limit || 2
        const response = await this.get(`search.json?q=${keywordVal}&limit=${limitVal}&type=sr`)
        //console.log(response.data.children)//this.subredditReducer(response[0]))
        let subs = response.data.children
        return Array.isArray(subs) ? subs.map(sub => this.subredditReducer(sub.data)) : [];
    }
}

module.exports = RedditAPI;