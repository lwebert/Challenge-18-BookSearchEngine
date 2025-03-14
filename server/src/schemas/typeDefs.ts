const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: 
        authors: [String]
        description: String
        title: String
        image: 
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input SaveBookInput {
        author: [String]
        description: String!
        title: String!
        bookId:
        image:
        link:
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        
        saveBook(input: SaveBookInput!): User
        removeBook(bookId: bookId!): User
    }
`;

export default typeDefs;