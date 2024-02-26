import React, { useEffect, useState } from 'react';
import aboutImage from "../../assets/images/image-about-banner.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Body = () => {
	const [Kurasawa, setKurasawa] = useState([]);
	const [Truffaut, setTruffaut] = useState([]);
	const [selectedFilm, setSelectedFilm] = useState(null);

	const fetchFilmsData = async (subject) => {
		try {
			const response = await fetch(`https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+mediatype:(movies)+AND+subject:("${subject}")&fl[]=title,description,identifier&output=json&rows=10`);
			const data = await response.json();
			return data.response.docs;
		} catch (error) {
			console.error('Error fetching films:', error);
			return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const kurasawaData = await fetchFilmsData("Kurosawa");
			const truffautData = await fetchFilmsData("Truffaut");
			setKurasawa(kurasawaData);
			setTruffaut(truffautData);
		};

		fetchData();
	}, []);

	const handleReadMore = (film) => {
		setSelectedFilm(film);
	};

	const handleCloseModal = () => {
		setSelectedFilm(null);
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}
		]
	};

	return (
		<div>
			<div className="m-10 md:m-20">
				<h1 className="text-3xl font-bold mb-4 dark:text-white">Classic Kurasawa:</h1>
				<Slider {...settings}>
					{Kurasawa.map(film => (
						<div key={film.identifier} className="film-card-container">
							<div className="film-card m-1 p-4 rounded shadow bg-slate-300 dark:bg-slate-700 bg-opacity-25 h-full">
								<div className="flex flex-col h-full">
									<div className="mt-2">
										<iframe
											width="100%"
											height="200"
											src={`https://archive.org/embed/${film.identifier}`}
											allowFullScreen
										></iframe>
										<h2 className="text-xl font-semibold my-4 text-center dark:text-white">{film.title.substring(0, 20)}{film.title.length > 20 && <span>...</span>}</h2>
										<p className="text-gray-600 dark:text-gray-300">{film.description.substring(0, 95)}{film.description.length > 100 && <span>...</span>}</p>
									</div>
									<div className="flex justify-center mt-auto">
										<button onClick={() => handleReadMore(film)} className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none mt-4">
											Read More
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
			<div className="m-10 md:m-20">
				<h1 className="text-3xl font-bold mb-4 dark:text-white">Classic Truffaut:</h1>
				<Slider {...settings}>
					{Truffaut.map(film => (
						<div key={film.identifier} className="film-card-container">
							<div className="film-card m-1 p-4 rounded shadow bg-gray-300 dark:bg-gray-700 bg-opacity-25 h-full">
								<div className="flex flex-col h-full">
									<div className="mt-2">
										<iframe
											width="100%"
											height="200"
											src={`https://archive.org/embed/${film.identifier}`}
											allowFullScreen
										></iframe>
										<h2 className="text-xl font-semibold my-4 text-center dark:text-white ">{film.title.substring(0, 20)}{film.title.length > 20 && <span>...</span>}</h2>
										<p className="text-gray-600 dark:text-gray-300">{film.description.substring(0, 95)}{film.description.length > 100 && <span>...</span>}</p>
									</div>
									<div className="flex justify-center mt-auto">
										<button onClick={() => handleReadMore(film)} className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none mt-4">
											Read More
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
			{selectedFilm && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50">
					<div className="bg-white dark:bg-gray-800 m-40 p-8 rounded-lg overflow-auto">
						<iframe
							title={selectedFilm.title}
							width="100%"
							height="200"
							src={`https://archive.org/embed/${selectedFilm.identifier}`}
							allowFullScreen
							className="mb-4"
						></iframe>
						<h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedFilm.title}</h2>
						<p className="dark:text-gray-300">{selectedFilm.description}</p>
						<div className="flex justify-center mt-4">
							<button onClick={handleCloseModal} className="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800 focus:outline-none">Close</button>
						</div>
					</div>
				</div>
			)}
			<section className="relative py-12">
				<div className="items-center flex flex-wrap">
					<div className="w-full md:w-5/12 ml-auto mr-auto">
						<img alt="..." className="max-w-full md:rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
					</div>
					<div className="w-full md:w-5/12 ml-auto mr-auto px-4 dark:text-white">
						<div className="md:pr-12">
						<img src={aboutImage} alt="About" className="md:max-w-sm my-8 dark:filter-dark dark:mix-blend-screen" />
							<h3 className="text-3xl">About <strong>Cinema Archive</strong></h3>
							<p className="mt-4 text-lg leading-relaxed text-blueGray-500">
								This project is built using:
							</p>
							<ul className="list-none mt-6">
								<li className="py-2">
									<div className="flex items-center">
										<div>
											<span className="inline-block p-2 rounded-full bg-purple-700 ml-1 mr-3"></span>
										</div>
										<div>
											<h4 className="text-blueGray-500">
												<strong>React + Vite.JS</strong> for frontend development
											</h4>
										</div>
									</div>
								</li>
								<li className="py-2">
									<div className="flex items-center">
										<div>
											<span className="inline-block p-2 bg-indigo-500 ml-1 mr-3"></span>
										</div>
										<div>
											<h4 className="text-blueGray-500">
												<strong>Tailwind CSS</strong> for styling and layout
											</h4>
										</div>
									</div>
								</li>
								<li className="py-2">
									<div className="flex items-center">
										<div>
											<span className="inline-block border-l-[10px] border-l-transparent border-b-[17px] border-b-yellow-500 border-r-[10px] border-r-transparent mr-3"></span>
										</div>
										<div>
											<h4 className="text-blueGray-500">
												<strong>Internet Archive API</strong> for movie data
											</h4>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Body;
