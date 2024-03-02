import { useState } from 'react';
const { ipcRenderer } = window.require('electron');

import ArrowRight from '@heroicons/react/24/solid/ArrowLongRightIcon'; // Adjusted for Heroicons v2

const UserCredentials = () => {
	const [formUsername, setFormUsername] = useState('');
	const [formPassword, setFormPassword] = useState('');

	// Example inside AutomaticForm component
	const handleChangeUsername = (event) => {
		setFormUsername(event.target.value);
	};

	const handleChangePassword = (event) => {
		setFormPassword(event.target.value);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		console.log(formUsername, formPassword);
		try {
			ipcRenderer.send('start-verifyLoginDetails', {
				username: formUsername,
				password: formPassword,
			});
		} catch (error) {
			console.error('There was an error submitting the form:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col items-center space-y-4">
				{' '}
				<input
					className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
					placeholder="Computer ID"
					type="text"
					onChange={handleChangeUsername}
				/>
				<input
					className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
					placeholder="Password"
					type="password"
					onChange={handleChangePassword}
				/>
				<button
					type="submit"
					className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400">
					<ArrowRight className="h-7 w-7 mr-2" />
				</button>
			</div>
		</form>
	);
};

export default UserCredentials;
