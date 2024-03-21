import Xmark from '@heroicons/react/24/solid/XMarkIcon'; // Adjusted for Heroicons v2

const Popup = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
				<div
					className="bg-zinc-900 p-4 rounded-lg max-w-md w-full"
					style={{
						minHeight: '40vh',
						maxHeight: '80vh',
						overflowY: 'auto',
					}}>
					<button
						onClick={onClose}
						className="float-right text-white hover:text-red-500 p-2 -mr-2 -mt-2">
						<Xmark className="h-6 w-6" />
					</button>
					{children}
				</div>
			</div>
		</>
	);
};

export default Popup;
