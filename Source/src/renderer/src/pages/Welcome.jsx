/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = () => {
	let navigate = useNavigate();

	const [appVersion, setAppVersion] = useState('');

	// Welcome.jsx
	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

	return (
		<>
			<div
				key="1"
				className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center px-4 w-full h-full">
				<ToastContainer />

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

				<style>
					{`
                @keyframes rgbEffect {
                  0% { background-color: #ff0000; } /* Red */
                  33% { background-color: #00ff00; } /* Green */
                  66% { background-color: #0000ff; } /* Blue */
                  100% { background-color: #ff0000; } /* Red */
                }
                
                .rgb-hover {
                  animation: rgbEffect 3s infinite;
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
				<p className="text-lg md:text-xl font-bold text-white tracking-tighter">
					v{appVersion}
				</p>

				<button
					className="mt-20 rgb-hover text-white font-bold py-2 px-4 rounded transition-colors duration-200 "
					onClick={() => navigate('/home')}>
					Proceed
				</button>
			</div>
		</>
	);
};

export default Welcome;
