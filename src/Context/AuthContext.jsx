import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginRequest } from "../api/auth"; // تأكدي المسار

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // جلب المستخدم من localStorage بشكل آمن
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await loginRequest({ email, password });

      const userData = res?.data?.user || res?.data?.data?.user || res?.data;
      const tokenData = res?.data?.token || res?.data?.access_token || res?.data?.data?.token;

      if (userData && (userData.name || userData.email)) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      if (tokenData) {
        localStorage.setItem("token", tokenData);
      }

      return res;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
