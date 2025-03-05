import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VerifyToken } from './verifytoken';
import SkeletonLoader from '../Components/SkeletonLoader';

// const ProtectedRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem('token');
//       const isValid = token ? await VerifyToken(token) : false;
//       console.log(isValid)
//       setIsAuthenticated(isValid);
//     };
//     checkToken();
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Show loading while checking authentication
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;



const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);  // State to handle loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const isValid = await VerifyToken(token);
          setIsAuthenticated(isValid);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkToken();
  }, []);

  if (loading) {
    return  <div>
      <SkeletonLoader />
      </div>; ; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
