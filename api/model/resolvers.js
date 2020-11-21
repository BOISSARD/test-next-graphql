module.exports = {
    Query: {
        search: (_, { keyword, limit/* = 100*/, after }, { dataSources }) => dataSources.redditAPI.searchSubreddits({ keyword: keyword, limit, after }),
    },
};