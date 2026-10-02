import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Read localStorage on first load, so a refresh doesn't log you out
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("lms_token") !== null
  );

  // MOCK login. Later, the Django JWT request goes here.
  function login() {
    localStorage.setItem("lms_token", "mock-token");
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("lms_token");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}