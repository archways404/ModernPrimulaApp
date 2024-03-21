import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import placeholderImage from '../../assets/imgnotavailable.svg';

const NewsFeed = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		ipcRenderer.send('start-fetchRSS-task', 'start');
		ipcRenderer.on('fetchRSS-task-complete', (event, fetchedArticles) => {
			if (fetchedArticles instanceof Error) {
				console.error('Error fetching articles:', fetchedArticles);
			} else {
				setArticles(fetchedArticles);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners('fetchRSS-task-complete');
		};
	}, []);

	return (
		<div className="mx-4 my-4">
			<div className="flex justify-between gap-5">
				{' '}
				{/* Adjust the gap as needed */}
				{articles.map((article, index) => (
					<div
						key={index}
						className="flex flex-col relative w-[calc(33.333%-10px)] bg-zinc-900 border border-zinc-900 rounded-lg overflow-hidden p-2" // Added p-4 for padding around the card content
					>
						<div className="flex justify-center items-center bg-zinc-900 h-48 mb-2 rounded">
							{' '}
							{/* Added a wrapper around the img for padding */}
							<img
								src={article.cover_image || placeholderImage}
								alt={article.title[0]}
								onError={(e) => (e.target.src = placeholderImage)}
								className="max-h-full max-w-full object-contain" // Changed to object-contain for the image
							/>
						</div>
						<div
							className="title text-base font-bold text-left mb-2 h-16 overflow-hidden"
							style={{
								lineHeight: '1.2em', // Keep inline if specific adjustment is needed
							}}>
							{article.title[0]}
						</div>
						<a
							href={article.link[0]}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm" // Styling for a text link
						>
							Read more
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default NewsFeed;
