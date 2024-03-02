const { ipcRenderer } = require('electron');
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Popup from './Popup';

const Editlogin = () => {
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

	const handleLearnMoreClick = () => {
		setIsModalOpen(true);
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
						<label className="text-white">Edit Login</label>
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
							className="rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400">
							Change
						</button>
					</div>
					<br></br>
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={shareComputerId}
							onChange={handleShareComputerIdChange}
						/>
						<label className="text-gray-200">
							Share my data with the developer -
							<span
								className="text-blue-500 cursor-pointer"
								onClick={handleLearnMoreClick}>
								{' '}
								learn more
							</span>
						</label>
					</div>
				</form>
			)}
			<Popup
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}>
				<h2 className="font-semibold text-lg mb-4">Data Sharing Information</h2>
				<p className="pl-20 pr-20">
					By enabling this option you agree to share some of your data with the
					developer.
				</p>
				<br></br>
				<p className="pl-20 pr-20">
					Your data will be strictly used for debugging and troubleshooting
					purposes only & will not be shared with any third party.
				</p>
				<br></br>
				<p className="pl-20 pr-20">
					The data that will be shared includes your computer ID and the time of
					use and not any personal information such as passwords or salary
					information.
				</p>
			</Popup>
		</div>
	);
};

export default Editlogin;
