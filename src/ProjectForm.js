import React, { useState } from 'react';

const ProjectForm = ({ setUserInfo, onClose }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  const isValidURL = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the project link
    if (!isValidURL(link)) {
      alert("Please enter a valid project URL.");
      return;
    }

    // Create the new project object
    const newProject = {
      title,
      image: image ? URL.createObjectURL(image) : null,
      link,
    };

    // Update user info with new project
    setUserInfo((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, newProject],
    }));

    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-lg p-6 max-w-md mx-auto border border-gray-600 animate__animated animate__fadeIn">
        <button 
          onClick={onClose} 
          className="text-white absolute top-2 right-2 text-xl bg-red-600 hover:bg-red-500 rounded-full p-3"
          aria-label="Close"
        > X </button>
        <h2 className="text-2xl font-bold text-white mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Link:</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
              required
              placeholder="Enter project URL"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-md shadow hover:bg-gray-700 transition"
          >Submit
</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
