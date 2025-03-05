import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import networkconfig from '../Dynamics/networkconfig';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${networkconfig.BASE_URL}/admin/logout`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        navigate('login');
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#E5E7EB] p-4 transform z-10 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:translate-x-0 md:relative md:w-1/8`}>

      <div className="text-1xl font-bold mb-8 flex justify-left items-center">
        <img src="https://i.ibb.co/Mk4ngCDf/dakshilogo.png" alt="Teacher Profile" className="w-28" />
        <button onClick={toggleSidebar} className="ml-10 md:hidden">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <nav className="space-y-4 px-2">
        {[{ icon: 'home', label: 'Home', path: '/dashboard' },
          { icon: 'certificate', label: 'Certificate', path: '/certificate' },
          { icon: 'address-card', label: 'Generate ID', path: '/generate-id' },
          { icon: 'rug', label: 'Offer Letter', path: '/offer-letter' },
          { icon: 'user-pen', label: 'Edit Profile', path: '/editprofile' },
          { icon: 'fa-sharp fa-solid fa-arrow-right-from-bracket fa-red', label: 'Logout'}
        ].map((item, index) => (
          item.label === 'Logout' ? (
            <button
              key={index}
              className={`flex items-center space-x-3 text-gray-700 hover:text-red-700 hover:font-semibold`}
              onClick={() => {
                handleLogout(); // Call logout function
                toggleSidebar(); // Close the sidebar on logout
              }}
            >
              <i className={`fas fa-${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ) : (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center space-x-2 text-gray-700 hover:text-gray-950 px-2 hover:bg-slate-100 ${
                location.pathname === item.path ? 'font-bold text-gray-900' : ''
              }`}
              onClick={toggleSidebar} // Close sidebar on click
            >
              <i className={`fas fa-${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          )
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
