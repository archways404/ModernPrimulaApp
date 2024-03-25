import { useNavigate } from 'react-router';

const DatePicker = () => {
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
				className="flex flex-col items-center justify-center bg-zinc-900 text-center pt-5 pr-5 pl-5">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-96 h-96 bg-zinc-900 rounded-lg overflow-hidden text-gray-200">
						<div className="text-center p-4">
							<h2 className="text-xl font-medium">Select Month</h2>
						</div>
						<div className="grid grid-cols-3 gap-4 p-4 bg-zinc-900">
							<button
								onClick={handleSubmit}
								value="01"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Jan
							</button>
							<button
								onClick={handleSubmit}
								value="02"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Feb
							</button>
							<button
								onClick={handleSubmit}
								value="03"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Mar
							</button>
							<button
								onClick={handleSubmit}
								value="04"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Apr
							</button>
							<button
								onClick={handleSubmit}
								value="05"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								May
							</button>
							<button
								onClick={handleSubmit}
								value="06"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Jun
							</button>
							<button
								onClick={handleSubmit}
								value="07"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Jul
							</button>
							<button
								onClick={handleSubmit}
								value="08"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Aug
							</button>
							<button
								onClick={handleSubmit}
								value="09"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Sep
							</button>
							<button
								onClick={handleSubmit}
								value="10"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Oct
							</button>
							<button
								onClick={handleSubmit}
								value="11"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Nov
							</button>
							<button
								onClick={handleSubmit}
								value="12"
								className="bg-zinc-900 pt-3 pb-3 text-white rounded-md border border-white hover:border-green-500 hover:text-green-500">
								Dec
							</button>
						</div>
					</div>
				</div>
			</div>
		);
};

export default DatePicker;
