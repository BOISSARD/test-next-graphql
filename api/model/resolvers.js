module.exports = {
    Query: {
        search: (_, { keyword, limit, sort, time, after }, { dataSources }) => {
            console.log("reolver search", keyword, limit, sort, time, after)
            return dataSources.redditAPI.searchSubreddits({ keyword: keyword, limit: limit, sort: sort, time: time, after: after })
        },
    },
};