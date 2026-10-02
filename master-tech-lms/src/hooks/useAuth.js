import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Shortcut: components write useAuth() instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}