import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import WebViewer from "./components/WebViewer";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/viewer" element={<WebViewer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
