// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Certificate from "./Pages/Certificate";
// import GenerateID from "./Pages/IDgen";
// import OfferLetter from "./Pages/OfferLetter";
// import Sidebar from "./Components/Sidebar";
// import Header from "./Components/Header";
// import ProfileCard from "./Components/ProfileCard";
// import Auth from "./Pages/Auth";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import ProtectedRoute from "./Context/ProtectedRoute";
// import Dashboard from "./Pages/Dashboard";
// import Forgotpass from './Pages/Forgotpass'
// import EditProfile from "./Components/Editprofile";

// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   // Check authentication when the app loads
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token); // Convert token existence to boolean
//   }, []);

//   return (
//     <Router>
//       <div className="flex flex-col md:flex-row h-screen font-Vietnam items-center">
        
//         {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
//         <main className="flex-1 p-10">
//           {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}

//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/Forgotpass" element={<Forgotpass />} />

//             {/* Protected Routes */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="*" element={<Dashboard />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/certificate" element={<Certificate />} />
//                 <Route path="/generate-id" element={<GenerateID />} />
//                 <Route path="/offer-letter" element={<OfferLetter />} />
//                 <Route path="/editprofile" element={<EditProfile/>} />
//               </Route>
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Certificate from "./Pages/Certificate";
import GenerateID from "./Pages/IDgen";
import OfferLetter from "./Pages/OfferLetter";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import ProfileCard from "./Components/ProfileCard";
import Auth from "./Pages/Auth";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./Context/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Forgotpass from './Pages/Forgotpass'
import EditProfile from "./Components/Editprofile";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Check authentication on load and update dynamically
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen font-Vietnam items-center">
        
        {/* Show Sidebar & Header only for authenticated users */}
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <main className="flex-1 md:m-5 sm:items-center">
          {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}

          <Routes>
            {/* Public Routes (No Token Required) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth" element={<Auth />} /> 
            <Route path="/forgotpass" element={<Forgotpass />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/profilecard" element={<ProfileCard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/generate-id" element={<GenerateID />} />
              <Route path="/offer-letter" element={<OfferLetter />} />

            {/* Protected Routes (Token Required) */}
            <Route element={<ProtectedRoute />}>
            </Route>

            {/* Redirect unknown paths to Dashboard if authenticated, else to Login */}
            <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;