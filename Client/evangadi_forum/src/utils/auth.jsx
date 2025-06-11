import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "./api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await baseURL.get("/api/auth/checkUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Fetch user error:", err);
      return false;
    }
  };

  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const isValid = validateToken(newToken);

    if (isValid) {
      const success = await fetchUserData(newToken);
      if (!success) {
        logout();
        return false;
      }
      return true;
    } else {
      logout();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      if (token && validateToken(token)) {
        await fetchUserData(token);
      } else {
        logout();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
