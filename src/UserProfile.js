import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';

const UserProfile = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleLogout = () => {
    setUserInfo({ name: '', bio: '', projects: [] }); // Reset user info
    localStorage.removeItem('userInfo'); // Clear user data from local storage
    navigate('/'); // Redirect to home
  };

  const handleAddProjectClick = () => {
    setIsAddingProject(true); // Show the Add Project form
  };

  const handleCloseOverlay = () => {
    setIsAddingProject(false); // Hide the Add Project form
  };

  const projects = userInfo.projects || [];

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-black to-gray-800 rounded-lg shadow-lg mt-10 border border-gray-600">
      <h2 className="text-2xl font-bold text-white mb-4">{userInfo.name || "Guest"}</h2>
      <p className="text-white mb-1">About Me:</p>
      <p className="text-white mb-4">{userInfo.bio || "No bio available."}</p>
      
      <h3 className="text-lg font-bold text-white mb-2">Projects:</h3>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 mb-4 rounded-lg border border-gray-600">
            <h4 className="text-white inline-block">{project.title || "Untitled Project"}</h4>
            {project.image && <img src={project.image} alt={project.title} className="mt-2 mb-2 rounded-md inline ml-2" style={{ width: '50px', height: '50px' }} />}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
              View Project
            </a>
          </div>
        ))
      ) : (
        <p className="text-white">No projects available.</p>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleAddProjectClick}
          className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
        >
          Add Another Project
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      {isAddingProject && (
        <div className="overlay">
          <div className="modal">
            <button onClick={handleCloseOverlay} className="close-button">✖</button>
            <h3 className="text-lg font-bold text-white">Add Project</h3>
            {/* Place the Add Project Form component here */}
            <ProjectForm onClose={handleCloseOverlay} setUserInfo={setUserInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
