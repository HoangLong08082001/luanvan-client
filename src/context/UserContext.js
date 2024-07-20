// src/context/AuthContext.js
import axios from "../setup-axios/axios";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = React.createContext(null);
const defaultData = {
  isLoading: true,
  isAuthenticated: false,
  token: "",
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultData);

  const login = (userData) => {
    setUser({ ...userData });
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser({ ...defaultData });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
