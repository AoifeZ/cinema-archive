import React, { useEffect, useState } from 'react';
import Hero from './Sections/Hero';
import FilmSliders from './Sections/FilmSliders';
import About from './Sections/About';

const Body = () => {
	return (
		<div>
			<Hero />
			<FilmSliders />
			<About />
		</div>
	);
};

export default Body;
