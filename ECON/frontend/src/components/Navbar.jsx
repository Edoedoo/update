import React, { useContext, useState, useEffect } from "react";
import "../css/Navbar.css";
import { DataContext } from "../globalState/FetchDataGlobal";
import { useNavigate } from "react-router-dom";

const Navbar = ({navbarTop}) => {
  const { listKategori1, listSubKategori1 } = useContext(DataContext);
  const [activeKategori, setActiveKategori] = useState([]); 
  const [limit] = useState (30)
  const [page] = useState (1)
  const navigate = useNavigate();

  useEffect(() => {
    if (listKategori1.length > 0) {
      setActiveKategori([listKategori1[0].id, listKategori1[1].id, listKategori1[2].id]); 
    }
  }, [listKategori1]);

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
    navigate(`/limit/${limit}/page/${page}/kategori/${kategoriId}/subkategori/${subkategoriId}`);
  };

  return (
    <div className="Navbar">
      <div className="navbarTop" style={{display:navbarTop}}>
        {/* Tombol Semua */}
        <div
          className="btnNavbar active"
          onClick={() => navigate("/")}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h5>Semua</h5>
          <h5 >≔</h5>
        </div>

        {/* Mapping Kategori */}
        {listKategori1.map((kategori) => {
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
              <div
                className={`btnNavbarMain ${activeKategori.includes(kategori.id) ? "active" : ""}`}
              >
                <h6
                  className="lihatSemuaKategoriTerkait"
                  onClick={() => navigate(`/limit/${limit}/page/${page}/kategori/${kategori.id}`)}
                >
                  lihat semua {kategori.kategori}
                </h6>
                {subkategoriItem && subkategoriItem.subKategori.length > 0 ? (
                  subkategoriItem.subKategori.map((sub) => (
                    <div
                      key={sub.id}
                      className="btnNavbar subkategoriBtn"
                      onClick={(e) => btnSubKategori(e, kategori.id, sub.id )}
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
      <div className="navbarMid">
        <h6>tester</h6>
      </div>
    </div>
  );
};

export default Navbar;
