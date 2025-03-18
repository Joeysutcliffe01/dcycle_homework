import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // updated import
import NameForm from "./components/NameForm";
import CovidData from "./components/CovidData";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/name-info" element={<NameForm />} />
          <Route path="/covid-data" element={<CovidData />} />
          <Route path="/" element={<CovidData />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
