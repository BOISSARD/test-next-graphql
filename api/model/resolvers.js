module.exports = {
    Query: {
        search: (_, { keyword, limit, sort, time, after }, { dataSources }) => dataSources.redditAPI.searchSubreddits({ keyword: keyword, limit: limit, sort: sort, time: time, after: after }),
        subreddit: (_, { name, limit, sort, time, after }, { dataSources }) => dataSources.redditAPI.subreddit({ name: name, limit: limit, sort: sort, time: time, after: after }),
        me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.findOrCreateUser({ email });
            if (user) {
                user.token = new Buffer.from(email).toString('base64');
                return user;
            }
        },
    },
};