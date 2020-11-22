module.exports = {
    Query: {
        search: (_, { keyword, limit, sort, time, after }, { dataSources }) => dataSources.redditAPI.searchSubreddits({ keyword: keyword, limit: limit, sort: sort, time: time, after: after }),
        subreddit: (_, { name, limit, sort, time, after }, { dataSources }) => dataSources.redditAPI.subreddit({ name: name, limit: limit, sort: sort, time: time, after: after }),
    },
};