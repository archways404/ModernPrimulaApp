import HomeIcon from '@heroicons/react/24/solid/HomeIcon'; // Adjusted for Heroicons v2
import { useNavigate } from 'react-router-dom';

const BtnX = () => {
	const navigate = useNavigate();
	return (
		<>
			<button className="float-right text-white hover:text-red-500">
				<HomeIcon className="h-5 w-5 mr-2" />
			</button>
		</>
	);
};

export default BtnX;
