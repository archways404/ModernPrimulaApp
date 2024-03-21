import { useState } from 'react';
const { ipcRenderer } = window.require('electron');

import ArrowRight from '@heroicons/react/24/solid/ArrowLongRightIcon';

const SetupCredentials = () => {
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
					className="w-64 h-12 px-4 rounded-md bg-zinc-900 text-gray-200"
					placeholder="Computer ID"
					type="text"
					onChange={handleChangeUsername}
				/>
				<input
					className="w-64 h-12 px-4 rounded-md bg-zinc-900 text-gray-200"
					placeholder="Password"
					type="password"
					onChange={handleChangePassword}
				/>
				<button
					type="submit"
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<ArrowRight className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Next
					</span>
				</button>
			</div>
		</form>
	);
};

export default SetupCredentials;
