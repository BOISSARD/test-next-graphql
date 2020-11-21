const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        search(keyword: String!, limit: Int, after: String): [Subreddit]
        subreddit(name: String!, limit: Int, after: String): Subreddit 
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
        id: ID!
        name: String!
        date: Int
        title: String
        description: String
        header: String
        icon: String
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