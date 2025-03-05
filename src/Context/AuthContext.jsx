import React, { createContext, useState, useContext, useEffect } from "react";

// Create a Context for authentication
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for loading state

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("your_server_url/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
