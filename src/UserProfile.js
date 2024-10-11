import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = ({ userInfo, setUserInfo }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserInfo({ name: '', bio: '', projects: [] }); // Reset user info
    localStorage.removeItem('userInfo'); // Clear user data from local storage
    navigate('/'); // Redirect to home
  };

  const projects = userInfo.projects || [];
  const isLoggedIn = userInfo.name !== ''; // Determine if the user is logged in

  const handleAddProject = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-black to-gray-800 rounded-lg shadow-lg mt-10 border border-gray-600">
      <h2 className="text-2xl font-bold text-white mb-4">{userInfo.name || "Guest"}</h2>
      <p className="text-white mb-1">About Me:</p>
      <p className="text-white mb-4">{userInfo.bio || "No bio available."}</p>
      
      <h3 className="text-lg font-bold text-white mb-2">Projects:</h3>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 mb-4 rounded-lg border border-gray-600">
            <h4 className="text-white">{project.title || "Untitled Project"}</h4>
            {project.image && <img src={project.image} alt={project.title} className="inline-block w-16 h-16 rounded-md mt-2 mb-2" />}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              View Project
            </a>
          </div>
        ))
      ) : (<>
        <p className="text-white mb-3">No projects available.</p>
        <Link to="/"  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md "><button>Log in </button></Link>
        </>
      )}
 
      {isLoggedIn && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddProject}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
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
      )}

      {/* Overlay for Adding a Project */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button className="absolute top-2 right-2 text-red-500" onClick={closeOverlay}>✖</button>
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <p className="mb-4">Please fill out the form below to add a new project.</p>
            {/* You can add the new project form here */}
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Project Title:</label>
                <input type="text" className="mt-1 p-2 block w-full border border-gray-400 rounded-md" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Project Image:</label>
                <input type="file" className="mt-1 p-2 block w-full border border-gray-400 rounded-md" accept="image/*" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Project Link:</label>
                <input type="text" className="mt-1 p-2 block w-full border border-gray-400 rounded-md" placeholder="Enter project URL" />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
