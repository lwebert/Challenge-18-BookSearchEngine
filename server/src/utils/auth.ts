// import type { Request, Response, NextFunction } from 'express';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

// interface JwtPayload {
// 	_id: unknown;
// 	username: string;
// 	email: string;
// }
const secretKey: any = process.env.JWT_SECRET_KEY || 'secret';

export const authenticateToken = ({ req }: { req: Request }) => {
	console.log('req: ', req);
	let token = req.body.token || req.query.token || req.headers.authorization;

	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	// console.log('Token: ', token);

	if (!token) {
		console.log('No token to authenticate.');
		return req;
	}

	// const secretKey: any = process.env.JWT_SECRET_KEY || '';
	console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
	console.log('JWT_SECRET_KEY:', secretKey);

	try {
		const { data }: any = jwt.verify(token, secretKey, { maxAge: '2hr' });
		console.log('data: ', data);
		req.user = data;
	} catch (err) {
		console.log('Invalid token. ', err);
	}

	return req;

	// const authHeader = req.headers.authorization;

	// if (authHeader) {
	// 	const token = authHeader.split(' ')[1];

	// 	const secretKey = process.env.JWT_SECRET_KEY || '';

	// 	jwt.verify(token, secretKey, (err, user) => {
	// 		if (err) {
	// 			return res.sendStatus(403); // Forbidden
	// 		}

	// 		req.user = user as JwtPayload;
	// 		return next();
	// 	});
	// } else {
	// 	res.sendStatus(401); // Unauthorized
	// }
};

export const signToken = (username: string, email: string, _id: unknown) => {
	const payload = { username, email, _id };
	// const secretKey: any = process.env.JWT_SECRET_KEY || 'secret';

	return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
	constructor(message: string) {
		super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
		Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
	}
}
