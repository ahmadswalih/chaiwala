import React from "react";
import { Home, TermsConditions } from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
