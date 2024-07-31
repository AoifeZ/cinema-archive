import React, { useEffect, useState } from 'react';
import FilmModal from './FilmModal';
import FilmSlider from './FilmSlider';

const FilmSection = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [Kurasawa, setKurasawa] = useState([]);
  const [Hitchcock, setHitchcock] = useState([]);

  // Fetch film data and set state
  useEffect(() => {
    const fetchFilmsData = async (subject, setState) => {
      try {
        const response = await fetch(`https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+mediatype:(movies)+AND+subject:("${subject}")&fl[]=title,description,identifier&output=json&rows=10`);
        const data = await response.json();
        setState(data.response.docs);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilmsData("Kurosawa", setKurasawa);
    fetchFilmsData("Hitchcock", setHitchcock);
  }, []);

  const handleReadMore = (film) => {
    setSelectedFilm(film);
  };

  const handleCloseModal = () => {
    setSelectedFilm(null);
  };

  return (
    <div>
      <div className="m-10 md:m-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Classic Kurasawa:</h1>
        <FilmSlider films={Kurasawa} handleReadMore={handleReadMore} />
      </div>
      <div className="m-10 md:m-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Classic Hitchcock:</h1>
        <FilmSlider films={Hitchcock} handleReadMore={handleReadMore} />
      </div>
      {selectedFilm && (
        <FilmModal selectedFilm={selectedFilm} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default FilmSection;
