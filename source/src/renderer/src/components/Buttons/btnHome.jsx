import HomeIcon from '@heroicons/react/24/solid/HomeIcon'; // Adjusted for Heroicons v2
import { useNavigate } from 'react-router-dom';

const BtnHome = () => {
	const navigate = useNavigate();
	return (
		<>
			<button
				onClick={() => navigate('/home')}
				className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400">
				<HomeIcon className="h-5 w-5 mr-2" />
			</button>
		</>
	);
};

export default BtnHome;
