const { ApolloServer } = require('apollo-server');
const typeDefs = require('./model/schema');
const resolvers = require('./model/resolvers');
const RedditAPI = require('./model/subreddit');
const dataSources = () => ({
	redditAPI: new RedditAPI(),
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
});

server.listen().then(() => {
	console.log(`
		Server is running!
		Listening on port 4000
	`);
});