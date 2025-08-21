import "../css/Header.css";
import ecLogoData from "../assets/ecLogoWhite.png";
import { useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";
import { useNavigate } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  const { listNamaProduk } = useContext(DataContext);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();

  // Filter produk sesuai search
  const filteredProduk = listNamaProduk
    .filter((item) =>
      item.nama_produk.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestion(true);
  };

  const handleSearch = () => {
    setShowSuggestion(false);
    if (search.trim() === "") {
      navigate("/produk?sort=termurah");
    } else {
      navigate(`/produk/cari?keyword=${encodeURIComponent(search)}`);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearch(item);
    setShowSuggestion(false);
  };

  return (
    <div className="header">
      <div className="topHeader">
        <h6>ini top header</h6>
      </div>

      <div className="midHeader">
        <div className="navbarLogo" onClick={() => navigate("/")}>
          <img
            src={ecLogoData}
            alt="logo perusahaan"
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="search-wrapper">
          <div className="input-container">
            <input
              className="searchProduk"
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={handleChange}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setTimeout(() => setShowSuggestion(false), 150)}
            />

            {/* Tombol Clear di dalam input */}
            {search && (
              <button
                className="clear-btn"
                onClick={() => setSearch("")}
                type="button"
              >
                ×
              </button>
            )}

            {/* Suggestion Box */}
            {showSuggestion && (
              <ul className="suggestion-box">
                {search.trim() === "" ? (
                  <li onMouseDown={() => handleSelectSuggestion("Termurah")}>
                    Termurah
                  </li>
                ) : filteredProduk.length > 0 ? (
                  filteredProduk.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={() =>
                        handleSelectSuggestion(item.nama_produk)
                      }
                    >
                      {item.nama_produk}
                    </li>
                  ))
                ) : (
                  <li className="no-result">Produk tidak ditemukan</li>
                )}
              </ul>
            )}
          </div>

          {/* Tombol Search */}
          <button className="search-btn" onClick={handleSearch} type="button">
            Search
          </button>
        </div>
      </div>

      <div className="botHeader">
        <h6>ini bottom header</h6>
      </div>
    </div>
  );
};

export default Header;
