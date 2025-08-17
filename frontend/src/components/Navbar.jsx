import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { DataContext } from "../globalState/FetchDataGlobal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { listKategori1, listSubKategori1 } = useContext(DataContext);
  const [activeKategori, setActiveKategori] = useState(null);
  const navigate = useNavigate();

  const btnKategori = (id) => {
    setActiveKategori((prev) => (prev === id ? null : id));
    navigate(`/kategori/${id}`)
  };
  
  const btnSubKategori = (e, id) => {
    e.stopPropagation();
    navigate(`/kategori/subKategori/${id}`)
  };

  return (
    <div className="Navbar">
      {/* Navbar Top */}
      <div className="navbarTop">
        <h6>kategori :</h6>

        {/* Tombol Semua */}
        <div className="btnNavbar active" onClick={() => navigate("/")}>
          <h5>Semua</h5>
        </div>

        {/* Mapping Kategori */}
        {listKategori1.map((kategori) => {
          // Ambil subkategori sesuai idKategori
          const subkategoriItem = listSubKategori1.find(
            (sub) => sub.idKategori === kategori.id
          );

          return (
            <div
              className={`btnNavbar ${activeKategori === kategori.id ? "active" : ""}`}
              key={kategori.id}
            >
              {/* Header Kategori */}
              <div
                className="kategoriHeader"
                onClick={() => btnKategori(kategori.id)}
                style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
              >
                <h5>{kategori.kategori}</h5>
                <h5>{activeKategori === kategori.id ? "▼" : "▶"}</h5>
              </div>

              {/* Subkategori */}
              <div className={`btnNavbarMain ${activeKategori === kategori.id ? "active" : ""}`}>
                {subkategoriItem && subkategoriItem.subKategori.length > 0 ? (
                  subkategoriItem.subKategori.map((sub) => (
                    <div
                      key={sub.id}
                      className="btnNavbar subkategoriBtn"
                      onClick={(e) => btnSubKategori(e, sub.id)}
                    >
                      <h6>{sub.subKategoriName}</h6>
                    </div>
                  ))
                ) : (
                  <h6>Tidak ada subkategori</h6>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navbar Bottom */}
      <div className="navbarBottom">
        <div className="btnNavbar">
          <h5>setting</h5>
        </div>
        <div className="btnNavbar">
          <h5>logout</h5>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
