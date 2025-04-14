import { signToken, AuthenticationError } from '../utils/auth.js';
// import { Query, Mutation } from './typeDefs';
import User from '../models/User.js';

interface LoginUserArgs {
	email: string;
	password: string;
}

interface AddUserArgs {
	username: string;
	email: string;
	password: string;
}

interface SaveBookArgs {
	input: {
		authors: string[];
		description: string;
		title: string;
		bookId: string;
		image?: string;
		link?: string;
	};
}

const resolvers = {
	Query: {
		me: async (_parent: any, _args: any, context: any) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id }).populate(
					'savedBooks'
				);
			}

			throw new AuthenticationError('Could not authenticate user.');
		},
	},

	Mutation: {
		login: async (_parent: any, { email, password }: LoginUserArgs) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError(
					'Incorrect email. Could not authenicate user.'
				);
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError(
					'Incorrect password. Could not authenciate user.'
				);
			}

			const token = signToken(user.username, user.email, user._id);
			return { token, user };
		},
		addUser: async (
			_parent: any,
			{ username, email, password }: AddUserArgs
		) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user.username, user.email, user._id);
			return { token, user };
		},
		saveBook: async (
			_parent: any,
			{ input }: SaveBookArgs,
			context: any
		) => {
			if (!context.user) {
				throw new AuthenticationError(
					'You need to be logged in to save a book.'
				);
			}

			const updatedUser = await User.findByIdAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { savedBooks: input } },
				{ new: true }
			).populate('savedBooks');

			return updatedUser;
		},
		removeBook: async (
			_parent: any,
			{ bookId }: { bookId: string },
			context: any
		) => {
			if (!context.user) {
				throw new AuthenticationError(
					'You need to be logged in to remove a saved book.'
				);
			}

			const updatedUser = await User.findByIdAndUpdate(
				{ _id: context.user._id },
				{ $pull: { savedBooks: { bookId } } },
				{ new: true }
			);

			return updatedUser; 
		},
	},
};

export default resolvers;
