/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZODF0yh0DlK
 */
const { ipcRenderer } = require('electron');
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editlogin = () => {
	const [formUsername, setFormUserame] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [showLoading, setShowLoading] = useState(false); // Assuming this is defined in your component

	const handleChangeUsername = (event) => {
		setFormUserame(event.target.value);
	};

	const handleChangePassword = (event) => {
		setFormPassword(event.target.value);
	};

	const handleSubmit = async (e) => {
		setShowLoading(true);
		e.preventDefault(); // Prevent default form submission behavior
		console.log('Username: ', formUsername, ' Password: ', formPassword);

		// Send login details to the main process
		ipcRenderer.send('start-verifyLoginDetails-task', {
			username: formUsername,
			password: formPassword,
		});

		// Listen for the completion of the login verification task
		ipcRenderer.once('verifyLoginDetails-task-complete', (event, response) => {
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
			}

			if (response.status === 'failed') {
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
			<ToastContainer />
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
						{' '}
						<label className="text-white">Edit Login</label>
						<input
							className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
							placeholder="Username"
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
							className="bg-green-500 text-white w-32 rounded-full">
							Submit
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default Editlogin
