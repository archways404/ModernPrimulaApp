/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from 'react';

import Popup from './Popup';

const ToS = () => {
	const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

	const handleTermsClick = () => {
		setIsTermsModalOpen(true);
	};
	return (
		<>
			<div className="w-full py-4">
				<label className="text-gray-400 text-xs">
					By using this application you agree to our
					<span
						className="text-green-500 hover:text-green-700 cursor-pointer"
						onClick={handleTermsClick}>
						{' '}
						terms and conditions
					</span>
				</label>
			</div>

			<Popup
				isOpen={isTermsModalOpen}
				onClose={() => setIsTermsModalOpen(false)}>
				<h2 className="font-semibold text-xl mb-4 text-white">
					Terms & Conditions
				</h2>
				<div className="p-6 overflow-auto scrollbar-hide max-h-96 text-left mx-auto">
					<h3 className="font-semibold text-lg mb-2 text-white">License</h3>
					<p className="mb-4 text-gray-400">
						The Service is provided under the MIT License. A copy of this
						license is included with the Service and is also available online.
					</p>
					<h3 className="font-semibold text-lg mb-2 text-white">
						Data Sharing
					</h3>
					<p className="mb-4 text-gray-400">
						By using the ModernPrimula software ("Service"), you agree to the
						collection and use of information in accordance with our Data
						Sharing policy. This includes:
					</p>
					<div className="pl-4 text-gray-400">
						<p>- Computer ID (optional)</p>
						<p>- Time of use</p>
						<p>- Errors encountered</p>
						<p>- Basic usage information</p>
					</div>
					<br></br>
					<p className="mb-4 text-gray-400">
						The data will be strictly used for debugging and troubleshooting
						purposes only and will not be shared with any third party.
					</p>
					<h3 className="font-semibold text-lg mb-2 text-white">Disclaimer</h3>
					<p className="mb-4 text-gray-400">
						Your use of the Service is at your sole risk. The Service is
						provided on an "AS IS" and "AS AVAILABLE" basis without warranties
						of any kind.
					</p>
					<h3 className="font-semibold text-lg mb-2 text-white">
						Governing Law
					</h3>
					<p className="mb-4 text-gray-400">
						These Terms shall be governed and construed in accordance with the
						laws of your jurisdiction, without regard to its conflict of law
						provisions.
					</p>
					<h3 className="font-semibold text-lg mb-2 text-white">Changes</h3>
					<p className="mb-4 text-gray-400">
						We reserve the right to modify or replace these Terms at any time at
						our sole discretion. Notice of any changes will be provided.
					</p>
					<h3 className="font-semibold text-lg mb-2 text-white">Contact Us</h3>
					<p className="mb-4 text-gray-400">
						If you have any questions about these Terms, please contact us.
					</p>
				</div>
			</Popup>
		</>
	);
};

export default ToS;
