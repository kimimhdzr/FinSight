import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

const AppWrapper = () => {
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
                // <RequireAuth>
                  <PrivateRoutes />
                // </RequireAuth>
              }
            />
          </Routes>
        </Router>


    </div>
  );
};
const App = () => {
  return (
      <AppWrapper />
  );
};

export default App;
