import Xmark from '@heroicons/react/24/solid/XMarkIcon'; // Adjusted for Heroicons v2

const Popup = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
				<div className="bg-gray-800 p-4 rounded-lg max-w-md w-full">
					<button
						onClick={onClose}
						className="float-right text-white hover:text-red-500">
						<Xmark className="h-5 w-5 mr-2" />
					</button>
					{children}
				</div>
			</div>
		</>
	);
};

export default Popup;
