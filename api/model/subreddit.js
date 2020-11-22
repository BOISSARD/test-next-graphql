const { RESTDataSource } = require('apollo-datasource-rest');

class RedditAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://www.reddit.com/';
    }

    subredditReducer(subreddit){
        let sub = subreddit.data || subreddit
        return {
            id: sub.id || 0,
            name: sub.display_name || "",
            date: sub.created_utc,
            title: sub.title,
            description: sub.public_description, // public_description_html
            header: sub.banner_img,
            icon: sub.icon_img,
            color: sub.primary_color,
            publications: sub.publications ? sub.publications.map(publi => this.publicationReducer(publi)) : []
        }
    }

    publicationReducer(publication){
        let publi = publication.data || publication
        return {
            id: publi.id || 0,
            name: publi.name,
            date: publi.created,
            title: publi.title,
            author: publi.name,
            subreddit: publi.subreddit,
            media: {
                thumbnail: publi.thumbnail,
                url: publi.url,
                video: publi.preview && publi.preview.reddit_video_preview ? publi.preview.reddit_video_preview.fallback_url : null
            },
            from: publi.crosspost_parent_list && publi.crosspost_parent_list.length > 0 ? this.publicationReducer(publi.crosspost_parent_list[0]) : null,
            comments: []
        }
    }

    async searchSubreddits({keyword, limit, sort, time, after}) { // sort one of (relevance, hot, top, new, comments)
        let keywordVal = keyword || ""
        const response = await this.get(`search.json?q=${keywordVal}&type=sr${limit && '&limit='+limit  || ""}${sort && '&sort='+sort || ""}${time && '&t='+time || ""}`)
        let subs = response.data.children
        return Array.isArray(subs) ? subs.map(sub => this.subredditReducer(sub)) : [];
    }


    async subreddit({name, limit, sort, time, after}) { // sort one of (relevance, hot, top, new, comments)
        let nameVal = name || ""
        console.log(name, limit, sort, time)
        const response = await this.get(`r/${name}/about.json?`)
        let url = `r/${name}.json?${limit && '&limit='+limit  || ""}${sort && '&sort='+sort || ""}${time && '&t='+time || ""}`
        console.log(url)
        const response2 = await this.get(url)
        response.data.publications = response2.data.children
        return this.subredditReducer(response)
    }

}

module.exports = RedditAPI;
