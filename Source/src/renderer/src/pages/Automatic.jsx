import AutomaticForm from '../components/AutomaticForm';
import DateForm from '../components/DateForm';
import UserCredentials from '../components/UserCredentials';

import { useState } from 'react';
import { useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import BtnHome from '../components/Buttons/btnHome';

const Automatic = () => {
	const username = localStorage.getItem('username');
	const password = localStorage.getItem('password');
	const name = localStorage.getItem('name');
	const salary = localStorage.getItem('salary');

	// Determine initial display states based on localStorage
	const [displayLoginForm, setDisplayLoginForm] = useState(
		!username || !password
	);
	const [displayInputForm, setDisplayInputForm] = useState(
		username && password && (!name || !salary)
	);

	useEffect(() => {
		ipcRenderer.on('verifyLoginDetails-complete', (event, arg) => {
			console.log(arg);
			if (arg.status === 'success') {
				localStorage.setItem('username', arg.username);
				localStorage.setItem('password', arg.password);
				setDisplayLoginForm(false);
				setDisplayInputForm(true);
				window.location.reload();
			} else {
				console.log('username and/or password is not defined or incorrect');
				console.log('status: ', arg.status);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners('verifyLoginDetails-task-complete');
		};
	}, []);

	return (
		<>
			<div className="flex flex-col items-center min-h-screen bg-gray-800 text-white px-4">
				<div className="mt-10 mb-2">
					{' '}
					{/* Reduce bottom margin */}
					<Logo />
					<div className="text-center mb-2 mt-2">
						{' '}
						{/* Adjusted margins */}
						<CurrentVersion />
					</div>
				</div>

				{displayLoginForm ? (
					<div className="pt-20">
						<UserCredentials />
					</div>
				) : displayInputForm ? (
					<div className="pt-20">
						<AutomaticForm />
					</div>
				) : (
					<DateForm />
				)}
			</div>
			<div className="fixed top-4 left-4">
				<BtnHome />
			</div>
		</>
	);
};

export default Automatic;
