import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Editlogin from '../components/EditLogin';
import EditInformation from '../components/EditInformation';

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import BtnHome from '../components/Buttons/btnHome';

const Settings = () => {
	return (
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

			<ToastContainer />

			{/* Flex container for side-by-side layout with reduced padding if necessary */}
			<div className="flex w-full justify-between px-4 mt-2">
				{' '}
				{/* Added top margin to pull closer */}
				<div className="w-1/2 p-2">
					<Editlogin />
				</div>
				<div className="w-1/2 p-2">
					<EditInformation />
				</div>
			</div>

			<div className="fixed top-4 left-4">
				<BtnHome />
			</div>
		</div>
	);
};

export default Settings;
