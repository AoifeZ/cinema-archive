import React, { useEffect, useState } from 'react';
import Hero from './Sections/Hero';
import FilmSection from './Sections/FilmSection/FilmSection';
import About from './Sections/About';

const Body = () => {
	return (
		<div>
			<Hero />
			<FilmSection />
			<About />
		</div>
	);
};

export default Body;
