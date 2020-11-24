// const { ApolloServer } = require('apollo-server-express');
const { ApolloServer } = require('apollo-server');
const express = require('express');
const typeDefs = require('./model/schema');
const resolvers = require('./model/resolvers');
const RedditAPI = require('./model/subreddit');
const UserAPI = require('./model/user');
const {Sequelize} = require('sequelize');
const isEmail = require('isemail');

const store = (() => {
	const db = new Sequelize({
		dialect: 'sqlite',
		storage: './store.sqlite'
	});
  
	const users = db.define('user', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		email: Sequelize.STRING,
		token: Sequelize.STRING,
	});
  
	const favorites = db.define('favorites', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.INTEGER,
		userId: Sequelize.INTEGER,
	});

	db.sync()//{force: true})
	users.findAll().then(all => console.log("Users : ", all.length, all));
	favorites.findAll().then(all => console.log("Favorites :", all.length, all));
  
	return { db, users, favorites };
})();

const context = async ({ req }) => {
	const auth = (req.headers && req.headers.authorization) || '';
	const email = new Buffer.from(auth, 'base64').toString('ascii');
	if (!isEmail.validate(email)) return { user: null };
	console.log("context", email)
	const users = await store.users.findOrCreate({ where: { email } });
	const user = users && users[0] ? users[0] : null;
	return { user };
};

const dataSources = () => ({
	redditAPI: new RedditAPI(),
    userAPI: new UserAPI({ store })
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	context,
});

server.listen(4444).then(({url}) => {
	console.log(`Server is running at ${url} !`);
});

// const app = express();
// server.applyMiddleware({ app, cors: {
// 	origin: '*',
// 	headers: "Origin, X-Requested-With, Content-Type, Accept",
// 	credentials: true
//   } 
// });
// app.listen({ port: 4444 }, (url) => {
// 	console.log(`Server is running on port 4444 !`);
// });