import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FilmSlider = ({ films, handleReadMore }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  const safeFilms = Array.isArray(films) ? films.filter(Boolean) : [];

  return (
    <Slider {...settings} className="[&_.slick-track]:flex [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full">
      {safeFilms.length > 0 ? safeFilms.map((film, index) => {
        const title = film?.title ?? 'Untitled';
        const description = film?.description ?? 'No description available.';
        const identifier = film?.identifier ?? `film-${index}`;

        return (
          <div key={identifier} className="film-card-container h-full">
            <div className="film-card m-1 p-4 rounded shadow bg-slate-300 dark:bg-slate-700 bg-opacity-25 h-full flex flex-col">
              <div className="flex flex-col h-full">
                <div className="mt-2">
                  <div className="relative w-full overflow-hidden rounded" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      title={title}
                      className="absolute inset-0 h-full w-full"
                      src={`https://archive.org/embed/${identifier}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h2 className="font-semibold my-4 dark:text-white">{title.slice(0, 100)}{title.length > 100 ? <span>...</span> : null}</h2>
                  <p className="text-slate-600 dark:text-slate-300">{description.slice(0, 100)}{description.length > 100 ? <span>...</span> : null}</p>
                </div>
                <div className="flex mt-auto">
                  <button onClick={() => handleReadMore(film)} className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none">
                    About this film
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }) : (
        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
          No films available yet.
        </div>
      )}
    </Slider>
  );
};

FilmSlider.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    identifier: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  })),
  handleReadMore: PropTypes.func.isRequired,
};

FilmSlider.defaultProps = {
  films: [],
};

export default FilmSlider;
