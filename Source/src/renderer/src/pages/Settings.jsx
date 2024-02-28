import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import HomeIcon from '@heroicons/react/24/solid/HomeIcon'; // Adjusted for Heroicons v2

// or
// import { HomeIcon } from '@heroicons/react/outline'; // For outline icons

import Editlogin from '../components/EditLogin';
import EditNameSalary from '../components/Editnamesalary';

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';

const Settings = () => {
	const navigate = useNavigate();

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
					<EditNameSalary />
				</div>
				<div className="w-1/2 p-2">
					<Editlogin />
				</div>
			</div>

			<div className="fixed top-4 left-4">
				<button
					onClick={() => navigate('/home')}
					className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400">
					<HomeIcon className="h-5 w-5 mr-2" />
				</button>
			</div>
		</div>
	);
};

export default Settings;
