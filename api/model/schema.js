const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        search(keyword: String!, limit: Int, sort: String, time: String, after: String): [Subreddit]
        subreddit(name: String!, limit: Int, sort: String, time: String, after: String): Subreddit 
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
        color: String
        publications: [Publication]!
    }

    type Publication {
        id: ID!
        name: String,
        date: Int
        title: String
        author: String
        subreddit: String
        media: Media
        from: Publication
        comments: [Comment]!
    }

    type Media {
        thumbnail: String
        url: String
        video: String
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