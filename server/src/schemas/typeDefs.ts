// import { ObjectId } from 'mongoose';
// import { UserDocument } from '../models/User';
// import { BookDocument } from '../models/Book';

const typeDefs = `
	type User {
		_id: ID!
		username: String!
		email: String!
		bookCount: Int
		savedBooks: [Book]
	}
	
	type Book {
		bookId: String!
		title: String!
		authors: [String!]
		description: String!
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	input UserInput {
    	username: String!
   		email: String!
    	password: String!
  	}

	input SaveBookInput {
		authors: [String!]
		description: String!
		title: String!
		bookId: String!
		image: String
		link: String
	}

	type Query {
		me: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(input: UserInput!): Auth
		saveBook(input: SaveBookInput!): User
		removeBook(bookId: String!): User
	}
`

export default typeDefs;
