// import { signToken, AuthenticationError } from '../utils/auth.js';
// import { User } from '../models/index.js';

// interface User {
//     _id: string;
//     username: string;
//     email: string;
//     password: string;
//     savedBooks: []
// }

// interface UserArgs {
// 	userId: string;
// 	username: string;
// }

// interface AddUserArgs {
//     username: string;
//     email: string;
//     password: string;
// }

// interface SaveBookArgs {
//     input: {
//         author: string[];
//         description: string;
//         title: string;
//         bookId: string;
//         image: string;
//         link: string;
//     }
// }

// interface Context {
//     user?: User;
// }

const resolvers = {
	Query: {
		// users: async () => {
		//     return User.find()
		// },
		// user: async (_parent: unknown, { userId, username }: UserArgs) => {
		//     return await User.findOne({ _id: userId, username: username })
		// },
		// me: async (
		// 	_parent: unknown,
		// 	_args: any,
		// 	context: Context
		// ) => {
		// 	if (context.user) {
		// 		return await userInfo.findONe({ _id: context.user._id });
		// 	}
		// 	throw AuthenticationError;
		// },
	},
	Mutation: {
		// login: async (_parent: any, args: any) => {
		// },
		// addUser: async (_parent: any, { username, email, password }: AddUserArgs): Promise<{ token: string; user: User }> => {
		// 	const user = await User.create({ username, email, password });
		// 	const token = signToken(user.username, user.password, user._id);
		// 	return { token, user };
		// },

        // saveBook: async (_parent: any, {input}: SaveBookArgs, context: Context)
	}
};

export default resolvers;

// login(email: String!, password: String!): Auth
// addUser(username: String!, email: String!, password: String!): Auth
// saveBook(input: SaveBookInput!): User
// removeBook(bookId: bookId!): User
