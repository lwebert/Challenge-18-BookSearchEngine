// see SignupForm.js for comments
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = ({}: { handleModalClose: () => void }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const [login, { error }] = useMutation(LOGIN_USER);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		try {
			const { data } = await login({ variables: { ...formData } });

			if (error || !data || !data.login || !data.login.token) {
				throw new Error('something went wrong!');
			}
			Auth.login(data?.login?.token);
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setFormData({
			email: '',
			password: '',
		});
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger">
					Something went wrong with your login credentials!
				</Alert>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Your email"
						name="email"
						onChange={handleInputChange}
						value={formData.email || ''}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Email is required!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Your password"
						name="password"
						onChange={handleInputChange}
						value={formData.password || ''}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Password is required!
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					disabled={!(formData.email && formData.password)}
					type="submit"
					variant="success">
					Submit
				</Button>
			</Form>
		</>
	);
};

export default LoginForm;
