import React from 'react';

const Home = ({ userInfo }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {userInfo.name ? `Welcome, ${userInfo.name}` : "Welcome to My Portfolio"}
      </h1>
      <p className="mt-4 text-base md:text-lg text-gray-700">
        {userInfo.bio ? `About Me: ${userInfo.bio}` : "No bio available."}
      </p>

      {userInfo.document && (
        <div className="mt-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">Uploaded Document</h3>
          <a
            href={userInfo.document}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Download Document
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
