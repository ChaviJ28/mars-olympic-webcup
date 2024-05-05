import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import './App.css';
import { createSounds } from "./sounds";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/home";
import PageApeRock from "@/pages/ape-rock";
import { Ticket } from "./pages/ticket";



function App() {
  const location = useLocation();

  useEffect(() => {
    createSounds();
  }, []);

  return (
    <main className="font-sans">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
          <Route path="/competition/:id" element={<PageApeRock />} />
          <Route path="/bettingticket" element={<Ticket />} />
        </Routes>
      </AnimatePresence>
      {/* <FPSStats /> */}
    </main>
  );
}

export default App;
