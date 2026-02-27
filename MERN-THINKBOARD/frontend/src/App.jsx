import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import EditPage from "./Pages/EditPage";
import NoteDetailsPage from "./Pages/NoteDetailsPage";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div data-theme="thinkboard">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/note" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
