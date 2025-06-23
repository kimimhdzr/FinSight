import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

import { AuthProvider } from "././Routes/AuthContext";
import RequireAuth from "././Routes/RequireAuth";

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
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
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

export default App;
