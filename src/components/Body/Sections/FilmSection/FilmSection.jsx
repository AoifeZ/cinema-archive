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

    const buildQuery = (creators) => {
      const filters = creators.map((creator) => `creator:("${creator}")`);
      return `mediatype:(movies) AND (${filters.join(' OR ')})`;
    };

    const normalizeTitleForDeduping = (value) => (
      toText(value, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\[[^\]]*\]|\([^\)]*\)/g, ' ')
        .replace(/\b(19|20)\d{2}\b/g, ' ')
        .replace(/\b(1080p|720p|480p|dvdrip|brrip|bluray|xvid|h264|hevc|restored|remastered|eng|sub|dubbed|full|movie|film|directed|director|criterion|edition|version)\b/g, ' ')
        .replace(/\b(andrei|andrey|tarkov\w*|luis|bunuel|alfred|hitchcock|akira|kurosawa)\b/g, ' ')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    );

    const getDedupeKey = (value) => {
      const normalized = normalizeTitleForDeduping(value);
      const words = normalized.split(' ').filter(Boolean);
      return words.slice(0, 4).join(' ');
    };

    const isLikelyDuplicateTitle = (firstTitle, secondTitle) => {
      if (!firstTitle || !secondTitle) {
        return false;
      }
      if (firstTitle === secondTitle) {
        return true;
      }
      const shorter = firstTitle.length <= secondTitle.length ? firstTitle : secondTitle;
      const longer = firstTitle.length > secondTitle.length ? firstTitle : secondTitle;
      return shorter.length >= 8 && longer.includes(shorter);
    };

    const dedupeByTitleKeepingMostViewed = (films) => {
      const selected = [];
      films.forEach((film) => {
        const duplicateExists = selected.some((existingFilm) => (
          (existingFilm.dedupeKey && existingFilm.dedupeKey === film.dedupeKey)
          || isLikelyDuplicateTitle(existingFilm.normalizedTitle, film.normalizedTitle)
        ));
        if (!duplicateExists) {
          selected.push(film);
        }
      });
      return selected;
    };

    const fetchFilmsData = async (creators, setState) => {
      const buildParams = () => {
        const params = new URLSearchParams();
        params.set('q', buildQuery(creators));
        params.append('fl[]', 'title');
        params.append('fl[]', 'description');
        params.append('fl[]', 'identifier');
        params.append('fl[]', 'downloads');
        params.append('sort[]', 'downloads desc');
        params.set('output', 'json');
        params.set('rows', '30');
        return params;
      };

      const normalizeDocs = (docs) => (
        dedupeByTitleKeepingMostViewed(
          (docs ?? [])
          .filter((film) => film?.identifier)
          .map((film) => ({
            identifier: toText(film.identifier, ''),
            title: toText(film.title, 'Untitled'),
            description: toText(film.description, 'No description available.'),
            downloads: Number.parseInt(toText(film.downloads, '0'), 10) || 0,
            normalizedTitle: normalizeTitleForDeduping(film.title),
            dedupeKey: getDedupeKey(film.title)
          }))
          .filter((film) => film.identifier !== '')
          .sort((first, second) => second.downloads - first.downloads)
        )
          .slice(0, 10)
          .map(({ normalizedTitle, dedupeKey, ...film }) => film)
      );

      const fetchFromNetlifyFunction = async () => {
        const response = await fetch(`/.netlify/functions/archive-search?creators=${encodeURIComponent(creators.join('|'))}`);
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

    fetchFilmsData(['Akira Kurosawa'], setKurosawa);
    fetchFilmsData(['Alfred Hitchcock'], setHitchcock);
    fetchFilmsData(['Andrei Tarkovsky'], setTarkovsky);
    fetchFilmsData(['Luis Buñuel', 'Luis Bunuel'], setBunuel);
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
