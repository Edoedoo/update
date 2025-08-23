import "../css/Header.css";
import ecLogoData from "../assets/ecLogoWhite.png";
import { useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";
import { useNavigate } from "react-router-dom";
import logoIg from "../assets/igLogo.png"
import logoFb from "../assets/fbLogo.png"

const Header = ({ 
  search, 
  setSearch, 
  setting, 
  setSetting,
  help,
  setHelp
}) => {
  const { listNamaProduk } = useContext(DataContext);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();
  const status = localStorage.getItem("login") === "true";

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

  const settingAll = () => {
    setSetting(navigate("/pengaturan"))
  }
  const helpAll = () => {
    setHelp(navigate("/bantuan"))
  }

  const handleSearch = () => {
    setShowSuggestion(false);
    if (search.trim() === "") {
      navigate("/");
    } else {
      navigate(`/cari?keyword=${encodeURIComponent(search)}`);
    }
    setSearch("");
  };

  const handleSelectSuggestion = (item) => {
    setSearch(item);
    setShowSuggestion(false);
  };

  const listCari = { item: ["termurah", "rekomendasi", "promo"] };

  return (
    <div className="header">
      <div className="topHeader">
        <div className="topHeaderLeft">
        <h5>mulai berjualan</h5> | <h5>download</h5> | <h5 className="ikutiKami">ikuti kami </h5><br /> <img src={logoIg} alt=""/> <br /><br /><img src={logoFb} alt="" />
        </div>
        <div className="topHeaderRight">
          <h5>🕭 Notifikasi</h5> |<h5 onClick={helpAll}>? Bantuan</h5> |<h5 onClick={settingAll}>⚙︎ Pengaturan</h5>|
          <div>
            {!status ? (
              <div className="topHeaderRight!login">
                <h5>login</h5>
                <h5>daftar</h5>
              </div>
            ) : (
              <div className="topHeaderRightLogin">
                <h5>akun</h5>
              </div>
            )}
          </div>
        </div>
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

            {search && (
              <button
                className="clear-btn"
                onClick={() => setSearch("")}
                type="button"
              >
                ×
              </button>
            )}

            {showSuggestion && (
              <ul className="suggestion-box">
                {search.trim() === "" ? (
                  listCari.item.map((item, index) => (
                    <li key={index} onMouseDown={() => handleSelectSuggestion(item)}>
                      {item}
                    </li>
                  ))
                ) : filteredProduk.length > 0 ? (
                  filteredProduk.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSelectSuggestion(item.nama_produk)}
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

          <button className="search-btn" onClick={handleSearch} type="button">
            🔍︎
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
