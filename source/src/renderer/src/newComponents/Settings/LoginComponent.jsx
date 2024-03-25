const { ipcRenderer } = require('electron');
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UpdateBTN from '@heroicons/react/24/solid/ArrowPathIcon';

const LoginComponent = () => {
	const [formUsername, setFormUsername] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [showLoading, setShowLoading] = useState(false);
	const [shareComputerId, setShareComputerId] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const savedShareComputerId = localStorage.getItem('shareComputerId');
		setShareComputerId(savedShareComputerId === 'true');
	}, []);

	const handleChangeUsername = (event) => {
		setFormUsername(event.target.value);
	};

	const handleChangePassword = (event) => {
		setFormPassword(event.target.value);
	};

	const handleShareComputerIdChange = (event) => {
		setShareComputerId(event.target.checked);
		localStorage.setItem('shareComputerId', event.target.checked);
	};

	const handleSubmit = async (e) => {
		setShowLoading(true);
		e.preventDefault(); // Prevent default form submission behavior
		console.log('Username: ', formUsername, 'Password: ', formPassword);

		// Send login details and computer ID share preference to the main process
		ipcRenderer.send('start-verifyLoginDetails', {
			username: formUsername,
			password: formPassword,
		});

		// Listen for the completion of the login verification task
		ipcRenderer.once('verifyLoginDetails-complete', (event, response) => {
			setShowLoading(false);
			console.log('Response: ', response);
			if (response.status === 'success') {
				console.log('Login successful');
				localStorage.setItem('username', formUsername);
				localStorage.setItem('password', formPassword);

				// Show a success toast notification
				toast.success('Data successfully updated!', {
					position: toast.POSITION.TOP_CENTER,
				});
			} else if (response.status === 'failed') {
				console.log('Login failed');
				// Optionally, show an error toast notification
				toast.error('Failed to update data.', {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		});
	};

	return (
		<div className="flex flex-col items-center space-y-4">
			{showLoading ? (
				<div className="loading-screen">
					<ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
					/>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col items-center space-y-4">
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
							<UpdateBTN className="h-6 w-6" />
							{/* Hover label */}
							<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
								Update
							</span>
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default LoginComponent;
