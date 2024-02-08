import { useNavigate } from 'react-router';

const DateForm = () => {
	let navigate = useNavigate();

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		const month = e.target.value;
		console.log(month);
		try {
			localStorage.setItem('month', month);
			navigate('/primulafunction');
		} catch (error) {
			console.error('There was an error submitting the form:', error);
		}
	};

	return (
		<div
			key="1"
			className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center pt-20 pr-10 pl-20">
			<div className="flex flex-col items-center space-y-4">
				<div className="w-72 h-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg text-gray-200">
					<div className="text-center p-4">
						<h2 className="text-lg font-medium">Select Month</h2>
					</div>
					<div className="grid grid-cols-3 gap-4 p-4 bg-gray-800">
						<button
							onClick={handleSubmit}
							value="01"
							className="bg-gray-700 text-white rounded-md">
							Jan
						</button>
						<button
							onClick={handleSubmit}
							value="02"
							className="bg-gray-700 text-white rounded-md">
							Feb
						</button>
						<button
							onClick={handleSubmit}
							value="03"
							className="bg-gray-700 text-white rounded-md">
							Mar
						</button>
						<button
							onClick={handleSubmit}
							value="04"
							className="bg-gray-700 text-white rounded-md">
							Apr
						</button>
						<button
							onClick={handleSubmit}
							value="05"
							className="bg-gray-700 text-white rounded-md">
							May
						</button>
						<button
							onClick={handleSubmit}
							value="06"
							className="bg-gray-700 text-white rounded-md">
							Jun
						</button>
						<button
							onClick={handleSubmit}
							value="07"
							className="bg-gray-700 text-white rounded-md">
							Jul
						</button>
						<button
							onClick={handleSubmit}
							value="08"
							className="bg-gray-700 text-white rounded-md">
							Aug
						</button>
						<button
							onClick={handleSubmit}
							value="09"
							className="bg-gray-700 text-white rounded-md">
							Sep
						</button>
						<button
							onClick={handleSubmit}
							value="10"
							className="bg-gray-700 text-white rounded-md">
							Oct
						</button>
						<button
							onClick={handleSubmit}
							value="11"
							className="bg-gray-700 text-white rounded-md">
							Nov
						</button>
						<button
							onClick={handleSubmit}
							value="12"
							className="bg-gray-700 text-white rounded-md">
							Dec
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DateForm;
