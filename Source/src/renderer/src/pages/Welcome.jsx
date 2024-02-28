/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../components/LearnMore';

const Welcome = () => {
	let navigate = useNavigate();

	const [appVersion, setAppVersion] = useState('');
	const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

	const handleTermsClick = () => {
		setIsTermsModalOpen(true);
	};

	return (
		<>
			<div
				key="1"
				className="flex flex-col justify-between items-center min-h-screen bg-gray-800 text-center px-4 w-full">
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

				<div className="space-y-4">
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
					<br></br>

					<button
						className="mt-20 rgb-hover text-white font-bold py-2 px-4 rounded transition-colors duration-200"
						onClick={() => navigate('/home')}>
						Proceed
					</button>
				</div>

				<div className="w-full py-4">
					<label className="text-gray-200">
						By using this application you agree to our
						<span
							className="text-blue-500 cursor-pointer"
							onClick={handleTermsClick}>
							{' '}
							terms and conditions
						</span>
					</label>
				</div>

				<Modal
					isOpen={isTermsModalOpen}
					onClose={() => setIsTermsModalOpen(false)}>
					<h2 className="font-semibold text-xl mb-4 text-gray-900">
						Terms & Conditions
					</h2>
					<div className="p-6 overflow-y-auto max-h-96 text-left mx-auto">
						<h3 className="font-semibold text-lg mb-2">License</h3>
						<p className="mb-4">
							The Service is provided under the MIT License. A copy of this
							license is included with the Service and is also available online.
						</p>
						<h3 className="font-semibold text-lg mb-2">Data Sharing</h3>
						<p className="mb-4">
							By using the ModernPrimula software ("Service"), you agree to the
							collection and use of information in accordance with our Data
							Sharing policy. This includes:
						</p>
						<div className="pl-4">
							<p>- Computer ID (optional)</p>
							<p>- Time of use</p>
							<p>- Errors encountered</p>
							<p>- Basic usage information</p>
						</div>
						<br></br>
						<p className="mb-4">
							The data will be strictly used for debugging and troubleshooting
							purposes only and will not be shared with any third party.
						</p>
						<h3 className="font-semibold text-lg mb-2">Disclaimer</h3>
						<p className="mb-4">
							Your use of the Service is at your sole risk. The Service is
							provided on an "AS IS" and "AS AVAILABLE" basis without warranties
							of any kind.
						</p>
						<h3 className="font-semibold text-lg mb-2">Governing Law</h3>
						<p className="mb-4">
							These Terms shall be governed and construed in accordance with the
							laws of your jurisdiction, without regard to its conflict of law
							provisions.
						</p>
						<h3 className="font-semibold text-lg mb-2">Changes</h3>
						<p className="mb-4">
							We reserve the right to modify or replace these Terms at any time
							at our sole discretion. Notice of any changes will be provided.
						</p>
						<h3 className="font-semibold text-lg mb-2">Contact Us</h3>
						<p className="mb-4">
							If you have any questions about these Terms, please contact us.
						</p>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default Welcome;
