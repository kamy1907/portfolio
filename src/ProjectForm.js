import React, { useState } from 'react';
import './index.css';

const ProjectForm = ({ onAddProject, onClose }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject({ title, image, link });
    setTitle('');
    setImage(null);
    setLink('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-black to-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Project Link:</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md text-black"
              required
              placeholder="Enter project URL"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-md hover:bg-gray-700 transition mb-2"
          >
            Add Project
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
