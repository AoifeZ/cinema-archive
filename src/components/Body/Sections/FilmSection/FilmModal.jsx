import React from 'react';

const FilmModal = ({ selectedFilm, onCloseModal }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-800 mx-4 sm:mx-auto my-10 p-8 rounded-lg overflow-hidden max-w-xl">
        <iframe
          title={selectedFilm.title}
          width="100%"
          height="315"
          src={`https://archive.org/embed/${selectedFilm.identifier}`}
          allowFullScreen
          className="mb-4"
          style={{ maxWidth: '100%' }}
        ></iframe>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedFilm.title}</h2>
        <div className="max-h-48 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-300"> {/* Container for description with fixed height and scrolling */}
          <p className="dark:text-gray-300">{selectedFilm.description}</p>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={onCloseModal} className="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800 focus:outline-none">Close</button>
        </div>
      </div>
    </div>
  );
};

export default FilmModal;
