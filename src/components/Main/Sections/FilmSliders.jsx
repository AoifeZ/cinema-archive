import React, { useEffect, useState } from 'react';
import FilmModal from './FilmModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FilmSliders = () => {
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
        <FilmModal selectedFilm={selectedFilm} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default FilmSliders;
