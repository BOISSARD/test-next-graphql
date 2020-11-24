const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        search(keyword: String!, limit: Int, sort: String, time: String, after: String): [Subreddit]
        subreddit(name: String!, limit: Int, sort: String, time: String, after: String): Subreddit 
        me: User
        favorites: [Subreddit]
    }

    type Mutation {
        login(email: String): User
        addFavorite(name: String): FavoriteResponse!
        removeFavorite(name: String): FavoriteResponse!
    }

    type Subreddit {
        id: ID!
        name: String
        date: Int
        title: String
        description: String
        header: String
        header_text: String
        icon: String
        color: String
        type: String
        category: String
        over18: Boolean
        subscribers: Int
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
        text: String
        ups: Int
        ups_ratio: Float
        from: Publication
        comments: [Comment]!
    }

    type Media {
        url: String
        url_type: String
        thumbnail: String
        video: String
    }

    type Comment {
        id: ID!
        message: String
        author: String
        date: Int
        ups: Int
        replies: [Comment]!
    }

    type User {
        id: ID!
        email: String!
        favorites: [Subreddit]!
        token: String
    }

    type FavoriteResponse {
        success: Boolean,
        message: String,
        favorite: Subreddit
    }
`;

module.exports = typeDefs;