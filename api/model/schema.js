const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        search(keyword: String): [Subreddit]
        subreddit(name: String!, pageSize: Int, after: String): Subreddit 
        me: User
        favoris: [Subreddit]
    }

    type Mutation {
        login(email: String): User
        addFavori(name: String): FavoriUpdateResponse!
        removeFavori(name: String): FavoriUpdateResponse!
    }

    type FavoriUpdateResponse {
      success: Boolean!
      message: String
      subreddit: Subreddit
    }

    type Subreddit {
        name: String!
        link: String
        topics: [Topic]!
    }

    type Topic {
        # date: Date
        title: String
        author: String
        media: String
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        message: String
        author: String
        replies: [Comment]!
    }

    type User {
        id: ID!
        email: String!
        favoris: [Subreddit]!
        token: String
    }
`;

module.exports = typeDefs;