import { useEffect, useState } from 'react';
import FilmModal from './FilmModal';
import FilmSlider from './FilmSlider';

const FilmSection = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [kurosawa, setKurosawa] = useState([]);
  const [Hitchcock, setHitchcock] = useState([]);

  // Fetch film data and set state
  useEffect(() => {
    const toText = (value, fallback) => {
      if (typeof value === 'string') {
        return value;
      }
      if (Array.isArray(value)) {
        return value.filter((item) => typeof item === 'string').join(' ').trim() || fallback;
      }
      return fallback;
    };

    const fetchFilmsData = async (subject, setState) => {
      try {
        const params = new URLSearchParams();
        params.set(
          'q',
          `collection:(feature_films) AND mediatype:(movies) AND (subject:("${subject}") OR creator:("${subject}") OR title:("${subject}"))`
        );
        params.append('fl[]', 'title');
        params.append('fl[]', 'description');
        params.append('fl[]', 'identifier');
        params.set('output', 'json');
        params.set('rows', '10');
        const response = await fetch(`https://archive.org/advancedsearch.php?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Archive API returned ${response.status}`);
        }
        const data = await response.json();
        const normalizedDocs = (data?.response?.docs ?? [])
          .filter((film) => film?.identifier)
          .map((film) => ({
            identifier: toText(film.identifier, ''),
            title: toText(film.title, 'Untitled'),
            description: toText(film.description, 'No description available.')
          }))
          .filter((film) => film.identifier !== '');
        setState(normalizedDocs);
      } catch (error) {
        console.error('Error fetching films:', error);
        setState([]);
      }
    };

    fetchFilmsData('Kurosawa', setKurosawa);
    fetchFilmsData('Hitchcock', setHitchcock);
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
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Classic Kurosawa:</h1>
        <FilmSlider films={kurosawa} handleReadMore={handleReadMore} />
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
