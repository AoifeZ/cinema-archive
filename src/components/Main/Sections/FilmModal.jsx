import React from 'react';

const FilmModal = ({ selectedFilm, onCloseModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-800 mx-4 sm:mx-auto my-10 p-8 rounded-lg overflow-auto max-w-xl"> {/* Adjusted max-width */}
        <iframe
          title={selectedFilm.title}
          width="100%"
          height="315" // Default aspect ratio of 16:9
          src={`https://archive.org/embed/${selectedFilm.identifier}`}
          allowFullScreen
          className="mb-4"
          style={{ maxWidth: '100%' }} // Make the video responsive
        ></iframe>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedFilm.title}</h2>
        <p className="dark:text-gray-300">{selectedFilm.description}</p>
        <div className="flex justify-center mt-4">
          <button onClick={onCloseModal} className="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-800 focus:outline-none">Close</button>
        </div>
      </div>
    </div>
  );
};

export default FilmModal;
