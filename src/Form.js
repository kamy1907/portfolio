import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = ({ setUserInfo }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [projects, setProjects] = useState([{ title: '', image: null, link: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleProjectChange = (index, e) => {
    const newProjects = [...projects];
    newProjects[index][e.target.name] = e.target.value;
    setProjects(newProjects);
  };

  const handleFileChange = (index, e) => {
    const newProjects = [...projects];
    newProjects[index].image = e.target.files[0];
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', image: null, link: '' }]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

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

    const isValid = projects.every((project) => isValidURL(project.link));

    if (!isValid) {
      alert("Please enter valid URLs for all projects.");
      return;
    }

    const projectsWithImages = projects.map(project => {
      const image = project.image ? URL.createObjectURL(project.image) : null;
      return { ...project, image };
    });

    setUserInfo({ name, bio, projects: projectsWithImages });
    setIsSubmitted(true);
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-black to-gray-800 rounded-lg shadow-lg mt-10 border border-gray-600 transition-opacity duration-500">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
              rows="4"
              required
              placeholder="Enter Bio"
            />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">Projects:</h3>
          {projects.map((project, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 mb-4 rounded-lg border border-gray-600">
              <div className="mb-2">
                <label className="block text-sm font-medium text-white">Project Title:</label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
                  required
                  placeholder="Enter project title"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-white">Project Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-white">Project Link:</label>
                <input
                  type="text"
                  name="link"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
                  required
                  placeholder="Enter project URL"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProject(index)}
                className="text-red-400 hover:underline mt-2"
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProject}
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-md shadow hover:bg-gray-700 transition mb-4"
          >
            Add Another Project
          </button>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center text-white mt-10">
          <h2 className="text-2xl font-bold">Thank you for your submission!</h2>
          <p className="mt-4">You are being redirected to your profile...</p>
        </div>
      )}
    </div>
  );
};

export default Form;
