import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../css/MainLayout.css";

export default function MainLayout() {
  const [selectedSubkategori, setSelectedSubkategori] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState(null);

  const [search, setSearch] = useState("");
  return (
    <div className="MainLayout">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <Navbar 
          onSubkategoriSelect={setSelectedSubkategori} 
          onKategoriSelect={setSelectedKategori} 
        />
        <Outlet 
          context={{ 
            selectedSubkategori, 
            selectedKategori, 
            search, 
            setSearch 
          }} 
        />
      </div>
      <Footer />
    </div>
  );
}


