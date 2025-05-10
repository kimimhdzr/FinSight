import { useState, useEffect } from "react";

export const useAuth = () => {
  // Simulate a logged-in user (null = not logged in)
  const [user, setUser] = useState(null);

  // Simulate login after 1 second (for demo/testing)
  useEffect(() => {
    const fakeUser = {
      id: "123",
      name: "Test User",
      email: "test@example.com",
    };

    // Simulate auto-login
    setTimeout(() => {
      setUser(fakeUser); // Set to null to simulate not logged in
    }, 1000);
  }, []);

    const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout};
};
