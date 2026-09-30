import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginRequest, logout as logoutRequest } from "../api/auth"; // تأكدي المسار

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // جلب المستخدم من localStorage بشكل آمن
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      console.log("Stored user:", storedUser); // للتشخيص
      console.log("Stored token:", storedToken); // للتشخيص
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser); // للتشخيص
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
      
      console.log("Full API Response:", res); // للتشخيص الكامل
      console.log("Response data:", res.data); // للتشخيص

      // التحقق من structure البيانات المختلفة
      const userData = res?.data?.user || res?.data?.data?.user || res?.data;
      const tokenData = res?.data?.token || res?.data?.access_token || res?.data?.data?.token;

      if (userData && (userData.name || userData.email)) {
        console.log("Setting user:", userData); // للتشخيص
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      if (tokenData) {
        console.log("Setting token:", tokenData); // للتشخيص
        localStorage.setItem("token", tokenData);
      }

      return res;
    } catch (err) {
      console.error("Login error:", err); // للتشخيص
      throw err; // هتتعامل معاه في Login Component
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
