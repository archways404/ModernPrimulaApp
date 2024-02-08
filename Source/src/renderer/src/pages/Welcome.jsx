/* eslint-disable no-unused-vars */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2EfWpNxPfdM
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = () => {
	const [statusMessage, setStatusMessage] = useState(null);
	const [formData, setFormData] = useState({
		productKey: '',
	});

	let navigate = useNavigate();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('http://localhost:9999/api/messages');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setStatusMessage(data.Messages);
				console.log(data.Messages);
			} catch (error) {
				console.error('Failed to fetch messages:', error);
			}
		};

		fetchMessages();
	}, []);

	// Update state on input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		console.log(formData);
		try {
			const response = await fetch('http://localhost:9999/api/verifyKey', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				const responseBody = await response.json();
				console.log('Form submitted successfully:', responseBody);
				//const isValid = responseBody.isValid
				const productKey = responseBody.productKey;
				const versionKey = responseBody.keyType;
				console.log('isValid: ', isValid);
				console.log('productKey: ', productKey);
				console.log('versionKey: ', versionKey);
				if (isValid) {
					console.log('Product key verified');
					navigate('/home');
				} else {
					// TEMP
					console.log('Product not verified');
					navigate('/home');
				}
				/*
        } else {
          toast.error('Failed', {
            position: toast.POSITION.TOP_CENTER
          })
          console.log('Product key not verified')
        }
      */
			} else {
				// TEMP
				console.log('Product not verified');
				navigate('/home');
				/*
				toast.error('Failed', {
					position: toast.POSITION.TOP_CENTER,
				});
				console.error('Form submission failed:', response.status);
				// Handle error
        */
			}
		} catch (error) {
			// TEMP
			console.log('Product not verified');
			navigate('/home');
			/*
			toast.error('Failed', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.error('There was an error submitting the form:', error);
			// Handle error
      */
		}
	};

	return (
		<>
			{statusMessage && (
				<div className="w-full fixed top-0 z-50">
					{Object.entries(statusMessage).map(([key, message]) => (
						<div
							key={key}
							style={{ backgroundColor: message.color }}
							className="p-2 text-black rounded-t mb-4 text-center">
							<p>{message.text}</p>
							<p className="text-gray-400 text-bold">
								Last updated: {new Date(message.timestamp).toLocaleString()}
							</p>
						</div>
					))}
				</div>
			)}
			<div
				key="1"
				className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center px-4">
				<ToastContainer />
				<h1 className="text-9xl font-bold tracking-tighter">
					<span className="text-red-500">M</span>
					<span className="text-yellow-500">o</span>
					<span className="text-green-500">d</span>
					<span className="text-blue-500">e</span>
					<span className="text-indigo-500">r</span>
					<span className="text-purple-500">n</span>
					<span className="text-pink-500">P</span>
					<span className="text-red-500">r</span>
					<span className="text-yellow-500">i</span>
					<span className="text-green-500">m</span>
					<span className="text-blue-500">u</span>
					<span className="text-indigo-500">l</span>
					<span className="text-purple-500">a</span>
				</h1>
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md mt-4">
					<div className="flex items-center border-b border-green-500 py-2">
						<input
							name="productKey"
							value={formData.productKey}
							onChange={handleChange}
							className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
							placeholder="Product Key"
							type="text"
						/>
					</div>
					<button
						className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
						type="submit">
						Proceed
					</button>
				</form>
			</div>
		</>
	);
};

export default Welcome;
