const { RESTDataSource } = require('apollo-datasource-rest');

class RedditAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://www.reddit.com/';
    }

    subredditReducer(subreddit){
        let sub = subreddit.data || subreddit
        return {
            id: sub.id || -1,
            name: sub.display_name,
            date: sub.created_utc,
            title: sub.title,
            description: sub.public_description, // public_description_html
            header: sub.banner_img,
            header_text: sub.header_title,
            icon: sub.icon_img,
            color: sub.primary_color,
            type: sub.subreddit_type,
            category: sub.content_category,
            over18: sub.over18,
            subscribers: sub.subscribers,
            publications: sub.publications ? sub.publications.map(publi => this.publicationReducer(publi)) : []
        }
    }

    publicationReducer(publication){
        let publi = publication.data || publication
        return {
            id: publi.id || -1,
            name: publi.name,
            date: publi.created_utc,
            title: publi.title,
            author: publi.name,
            subreddit: publi.subreddit,
            ups: publi.ups,
            ups_ratio: publi.upvote_ratio,
            media: {
                url: publi.url,
                url_type: publi.post_hint,
                thumbnail: publi.thumbnail,
                // video: publi.preview && publi.preview.reddit_video_preview ? publi.preview.reddit_video_preview.fallback_url : null
                video: publi.secure_media && publi.secure_media.reddit_video ? publi.secure_media.reddit_video.fallback_url : publi.preview && publi.preview.reddit_video_preview ? publi.preview.reddit_video_preview.fallback_url : null
            },
            text: publi.selftext_html,
            from: publi.crosspost_parent_list && publi.crosspost_parent_list.length > 0 ? this.publicationReducer(publi.crosspost_parent_list[0]) : null,
            comments: publi.comments ? publi.comments.map(comm => this.commentReducer(comm)) : []
        }
    }

    commentReducer(comment) {
        let comm = comment.data || comment
        return {
            id: comm.id || -1,
            message: comm.body_html,
            author: comm.author,
            date: comm.created_utc,
            ups: comm.ups,
            //replies: []//publi.comments ? publi.comments.map(rep => this.publicationReducer(rep)) : []
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
        const response = await this.get(`r/${name}/about.json?`)
        if(response.kind !== "t5") return null
        const response2 = await this.get(`r/${name}${sort && '/'+sort || ""}.json?${limit && '&limit='+limit  || ""}${time && '&t='+time || ""}`)
        response.data.publications = response2.data.children
        // response.data.publications.forEach(publi => {
        for(const publi of response.data.publications) {
            // limit=3&depth=1 pour avoir uniquement 3 commentaires sans réponses
            let url = `r/${name}/comments/${publi.data.id}.json?limit=3&depth=1` 
            let pResponse = await this.get(url)
            publi.data.comments = pResponse[1].data.children.slice(0, -1)
            console.log(publi.data.id, url, pResponse[1].data.children.length, publi.data.comments.length)
        // });
        }
        return this.subredditReducer(response)
    }

}

module.exports = RedditAPI;
