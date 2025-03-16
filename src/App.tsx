import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";
import NameForm from "./components/NameForm";
import CovidData from "./components/CovidData";

const App: React.FC = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/name-info" element={<NameForm />} />
          <Route path="/covid-data" element={<CovidData />} />
          <Route path="/" element={<CovidData />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
