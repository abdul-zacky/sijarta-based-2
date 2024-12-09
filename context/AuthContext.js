"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /**
   * Logs in the user by verifying credentials against the database
   * via the /api/login endpoint. If successful, sets `user` state.
   * @param {string} phone
   * @param {string} password
   * @returns {Promise<boolean>} true if login successful, false otherwise
   */
  const login = async (phone, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });

    if (res.ok) {
      const userData = await res.json();
      setUser(userData);
      return true;
    } else {
      return false;
    }
  };

  /**
   * Registers a new user by sending their data to the /api/register endpoint.
   * On success, sets `user` state to the newly created user object.
   * @param {object} newUser - {role, name, password, gender, phone, birthDate, address, bankName, accountNumber, npwp, photoUrl}
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const registerUser = async (newUser) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    const result = await res.json();
    if (res.ok) {
      setUser(result);
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  /**
   * Logs out the current user by clearing `user` state.
   * In a full production setup, you'd also remove any session cookies on the server side.
   */
  const logout = () => {
    setUser(null);
    // If using sessions or JWTs, also clear them server-side.
  };

  return (
    <AuthContext.Provider value={{ user, login, register: registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);