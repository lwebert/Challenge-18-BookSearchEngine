import express from 'express';
import path from 'path'; //or from 'node:path' ?
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index';
import db from './config/connection.js';
import { authenticateToken } from './services/auth';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startApolloServer = async () => {
	await server.start();
	await db();

	const PORT = process.env.PORT || 3001;
	const app = express();

	app.use(express.urlencoded({ extended: false })); //changed extened from true to false
	app.use(express.json());

	app.use(
		'/graphql',
		expressMiddleware(server as any, { context: authenticateToken as any })
	);

	// if we're in production, serve client/dist as static assets
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));

		app.get('*', (_req: Request, res: Response) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	}

	db.on('error', console.error.bind(console, 'MongoDB connection error:'));

	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
	});
};

startApolloServer();
