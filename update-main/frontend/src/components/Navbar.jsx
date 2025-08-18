import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { DataContext } from "../globalState/FetchDataGlobal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { listKategori1, listSubKategori1 } = useContext(DataContext);
  const [activeKategori, setActiveKategori] = useState([]); 

  const navigate = useNavigate();

  const btnKategori = (id) => {
    setActiveKategori((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  
  const btnSubKategori = (e, kategoriId, subkategoriId) => {
    e.stopPropagation();
    navigate(`/kategori/${kategoriId}/subKategori/${subkategoriId}`)
  };
  

  return (
    <div className="Navbar">
      {/* Navbar Top */}
      <div className="navbarTop">
        <h6>kategori :</h6>

        {/* Tombol Semua */}
        <div className="btnNavbar active" onClick={() => navigate("/")} style={{display:'flex', justifyContent:'space-between'}}>
          <h5>Semua</h5>
          <h5 style={{paddingRight:'2%'}}>…</h5>
        </div>

        {/* Mapping Kategori */}
        {listKategori1.map((kategori) => {
          // Ambil subkategori sesuai idKategori
          const subkategoriItem = listSubKategori1.find(
            (sub) => sub.idKategori === kategori.id
          );

          return (
            <div
              className={`btnNavbar ${activeKategori.includes(kategori.id) ? "active" : ""}`}
              key={kategori.id}
            >
              {/* Header Kategori */}
              <div
                className="kategoriHeader"
                onClick={() => btnKategori(kategori.id)}
                style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
              >
                <h5>{kategori.kategori}</h5>
                <h5>{activeKategori.includes(kategori.id) ? "︿" : "﹀"}</h5>
              </div>

              {/* Subkategori */}
              <div className={`btnNavbarMain ${activeKategori.includes(kategori.id) ? "active" : ""}`}>
                <h6
                  className="lihatSemuaKategoriTerkait"
                  onClick={() => navigate(`/kategori/${kategori.id}`)}
                >
                  lihat semua {kategori.kategori}
                </h6>
                {subkategoriItem && subkategoriItem.subKategori.length > 0 ? (
                  subkategoriItem.subKategori.map((sub) => (
                    <div
                      key={sub.id}
                      className="btnNavbar subkategoriBtn"
                      onClick={(e) => btnSubKategori(e, kategori.id, sub.id)}
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
    </div>
  );
};

export default Navbar;
