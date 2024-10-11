import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', image: null, link: '' });
  const [isLoading, setIsLoading] = useState(true); // Loading state for animation

  const handleLogout = () => {
    setUserInfo({ name: '', bio: '', projects: [] });
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.image && newProject.link) {
      const projectWithImage = { ...newProject, image: URL.createObjectURL(newProject.image) };
      setUserInfo((prev) => ({ ...prev, projects: [...prev.projects, projectWithImage] }));
      setIsOverlayOpen(false); // Close overlay after adding
      setNewProject({ title: '', image: null, link: '' }); // Reset form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProject((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleCancel = () => {
    setIsOverlayOpen(false); // Close overlay without saving
    setNewProject({ title: '', image: null, link: '' }); // Reset new project form
  };

  const projects = userInfo.projects || [];
  const isGuest = !userInfo.name || userInfo.name === 'Guest'; // Check if the user is a guest

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 1 second
    }, 1000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className={`max-w-md mx-auto p-6 bg-gradient-to-r from-black to-gray-800 rounded-lg shadow-lg mt-10 border border-gray-600 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold text-white mb-4">{userInfo.name || 'Guest'}</h2>
      <p className="text-white mb-1">About Me:</p>
      <p className="text-white mb-4">{userInfo.bio || 'No bio available.'}</p>
      
      <h3 className="text-lg font-bold text-white mb-2">Projects:</h3>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 mb-4 rounded-lg border border-gray-600">
            <h4 className="text-white font-bold underline">{project.title || 'Untitled Project'}</h4>
            {project.image && <img src={project.image} alt={project.title} className="mt-2 mb-2 rounded-md inline w-16 h-16" />}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline ml-2">
              View Project
            </a>
          </div>
        ))
      ) : (
        <p className="text-white">No projects available.</p>
      )}

      {isGuest ? (
        <button
          onClick={() => navigate('/')} // Redirect to the form for login
          className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
        >
          Log In
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="mt-4 py-2 px-4 bg-gradient-to-b from-gray-600 to-gray-500 mr-4 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            {projects.length === 0 ? 'Add Project' : 'Add Another Project'}
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </>
      )}
      
      {/* Overlay for adding a new project */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-bold text-white mb-2">Add New Project</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Project Title:</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
                required
                placeholder="Enter project title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Project Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Project Link:</label>
              <input
                type="text"
                name="link"
                value={newProject.link}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 text-black"
                required
                placeholder="Enter project URL"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddProject}
                className="py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-md mr-2"
              >
                Add Project
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
