import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm'; // Import the ProjectForm component

const UserProfile = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);

  const handleLogout = () => {
    setUserInfo({ name: '', bio: '', projects: [] }); // Reset user info
    localStorage.removeItem('userInfo'); // Clear user data from local storage
    navigate('/'); // Redirect to home
  };

  const handleAddProject = (project) => {
    // Update userInfo with the new project
    const newProject = { ...project, image: URL.createObjectURL(project.image) };
    setUserInfo(prevState => ({
      ...prevState,
      projects: [...prevState.projects, newProject]
    }));
    setIsProjectFormVisible(false); // Close the form
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
            <h4 className="text-white inline">{project.title || "Untitled Project"}</h4>
            {project.image && <img src={project.image} alt={project.title} className="inline w-16 h-16 ml-2 rounded-md" />}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mt-2">
              View Project
            </a>
          </div>
        ))
      ) : (
        <p className="text-white">No projects available.</p>
      )}

      <button
        onClick={() => setIsProjectFormVisible(true)}
        className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-md"
      >
        Add Another Project
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 ml-2 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
      >
        Logout
      </button>

      {isProjectFormVisible && (
        <ProjectForm onAddProject={handleAddProject} onClose={() => setIsProjectFormVisible(false)} />
      )}
    </div>
  );
};

export default UserProfile;
