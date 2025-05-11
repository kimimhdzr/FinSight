import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";



import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import RequireAuth from "./Routes/RequireAuth";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"]; // Add '/register' if you make one

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">

        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/*" element={<PublicRoutes />} />
            {/* Protected routes */}
            <Route
              path="/app/*"
              element={
                <RequireAuth>
                  <PrivateRoutes />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>

    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
