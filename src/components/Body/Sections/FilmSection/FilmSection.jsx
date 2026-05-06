import { useEffect, useState } from 'react';
import FilmModal from './FilmModal';
import FilmSlider from './FilmSlider';

const FilmSection = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [kurosawa, setKurosawa] = useState([]);
  const [Hitchcock, setHitchcock] = useState([]);
  const [tarkovsky, setTarkovsky] = useState([]);
  const [bunuel, setBunuel] = useState([]);

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

    const buildQuery = (terms) => {
      const filters = terms.map((term) => (
        `creator:("${term}") OR subject:("${term}") OR title:("${term}")`
      ));
      return `collection:(feature_films) AND mediatype:(movies) AND (${filters.join(' OR ')})`;
    };

    const fetchFilmsData = async (searchTerms, setState) => {
      const buildParams = () => {
        const params = new URLSearchParams();
        params.set('q', buildQuery(searchTerms));
        params.append('fl[]', 'title');
        params.append('fl[]', 'description');
        params.append('fl[]', 'identifier');
        params.append('sort[]', 'downloads desc');
        params.set('output', 'json');
        params.set('rows', '10');
        return params;
      };

      const normalizeDocs = (docs) => (
        (docs ?? [])
          .filter((film) => film?.identifier)
          .map((film) => ({
            identifier: toText(film.identifier, ''),
            title: toText(film.title, 'Untitled'),
            description: toText(film.description, 'No description available.')
          }))
          .filter((film) => film.identifier !== '')
      );

      const fetchFromNetlifyFunction = async () => {
        const response = await fetch(`/.netlify/functions/archive-search?terms=${encodeURIComponent(searchTerms.join('|'))}`);
        if (!response.ok) {
          throw new Error(`Netlify function returned ${response.status}`);
        }
        const payload = await response.json();
        return normalizeDocs(payload?.docs);
      };

      const fetchFromArchiveDirectly = async () => {
        const params = buildParams();
        const response = await fetch(`https://archive.org/advancedsearch.php?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Archive API returned ${response.status}`);
        }
        const data = await response.json();
        return normalizeDocs(data?.response?.docs);
      };

      try {
        const films = await fetchFromNetlifyFunction();
        setState(films);
      } catch (netlifyError) {
        try {
          const films = await fetchFromArchiveDirectly();
          setState(films);
        } catch (archiveError) {
          console.error('Error fetching films:', netlifyError, archiveError);
          setState([]);
        }
      }
    };

    fetchFilmsData(['Akira Kurosawa', 'Kurosawa'], setKurosawa);
    fetchFilmsData(['Alfred Hitchcock', 'Hitchcock'], setHitchcock);
    fetchFilmsData(['Andrei Tarkovsky', 'Tarkovsky'], setTarkovsky);
    fetchFilmsData(['Luis Buñuel', 'Luis Bunuel', 'Bunuel', 'Buñuel'], setBunuel);
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
      <div className="m-10 md:m-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Andrei Tarkovsky:</h1>
        <FilmSlider films={tarkovsky} handleReadMore={handleReadMore} />
      </div>
      <div className="m-10 md:m-20">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Luis Buñuel:</h1>
        <FilmSlider films={bunuel} handleReadMore={handleReadMore} />
      </div>
      {selectedFilm && (
        <FilmModal selectedFilm={selectedFilm} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default FilmSection;
