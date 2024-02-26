import AutomaticForm from '../components/AutomaticForm';
import DateForm from '../components/DateForm';
import UserCredentials from '../components/UserCredentials';

import { useState } from 'react';
import { useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

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
		ipcRenderer.on('verifyLoginDetails-task-complete', (event, arg) => {
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
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center pt-20 pr-10 pl-20">
			<style>
				{`
            @keyframes rgbTextEffect {
              0% { color: #ff0000; } /* Red */
              33% { color: #00ff00; } /* Green */
              66% { color: #0000ff; } /* Blue */
              100% { color: #ff0000; } /* Red again */
            }

            .rgbEffect {
              animation: rgbTextEffect 10s infinite linear;
            }
          `}
			</style>

			<h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none">
				<span className="rgbEffect">M</span>
				<span className="rgbEffect">o</span>
				<span className="rgbEffect">d</span>
				<span className="rgbEffect">e</span>
				<span className="rgbEffect">r</span>
				<span className="rgbEffect">n</span>
				<span className="rgbEffect">P</span>
				<span className="rgbEffect">r</span>
				<span className="rgbEffect">i</span>
				<span className="rgbEffect">m</span>
				<span className="rgbEffect">u</span>
				<span className="rgbEffect">l</span>
				<span className="rgbEffect">a</span>
			</h1>
			{displayLoginForm ? (
				<UserCredentials />
			) : displayInputForm ? (
				<AutomaticForm />
			) : (
				<DateForm />
			)}
		</div>
	);
};

export default Automatic;
