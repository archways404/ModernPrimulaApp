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
			className="flex flex-col items-center justify-center bg-gray-800 text-center pt-5 pr-5 pl-5">
			<div className="flex flex-col items-center space-y-4">
				<div className="w-72 h-72 bg-gray-800 rounded-lg overflow-hidden text-gray-200">
					<div className="text-center p-4">
						<h2 className="text-lg font-medium">Select Month</h2>
					</div>
					<div className="grid grid-cols-3 gap-4 p-4 bg-gray-800">
						<style>
							{`
                @keyframes rgbEffect {
                  0% { background-color: #ff0000; } /* Red */
                  33% { background-color: #00ff00; } /* Green */
                  66% { background-color: #0000ff; } /* Blue */
                  100% { background-color: #ff0000; } /* Red */
                }
                
                .rgb-hover:hover {
                  animation: rgbEffect 3s infinite;
                }
              `}
						</style>
						<button
							onClick={handleSubmit}
							value="01"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Jan
						</button>
						<button
							onClick={handleSubmit}
							value="02"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Feb
						</button>
						<button
							onClick={handleSubmit}
							value="03"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Mar
						</button>
						<button
							onClick={handleSubmit}
							value="04"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Apr
						</button>
						<button
							onClick={handleSubmit}
							value="05"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							May
						</button>
						<button
							onClick={handleSubmit}
							value="06"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Jun
						</button>
						<button
							onClick={handleSubmit}
							value="07"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Jul
						</button>
						<button
							onClick={handleSubmit}
							value="08"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Aug
						</button>
						<button
							onClick={handleSubmit}
							value="09"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Sep
						</button>
						<button
							onClick={handleSubmit}
							value="10"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Oct
						</button>
						<button
							onClick={handleSubmit}
							value="11"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Nov
						</button>
						<button
							onClick={handleSubmit}
							value="12"
							className="bg-gray-700 pt-1 pb-1 text-white rounded-md rgb-hover">
							Dec
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DateForm;
