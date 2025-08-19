import "../css/Header.css";
import ecLogoData from "../assets/ecLogoWhite.png";

const Header = ({ search, setSearch }) => {
  return (
    <div className="header">
        <div className="topHeader">
            <h6>ini top header</h6>
        </div>
        <div className="midHeader">
            <div className="navbarLogo" onClick={() => window.location.reload()}>
                <img src={ecLogoData} alt="logo perusahaan" style={{ cursor: "pointer" }}/>
            </div>
            <div className="search-wrapper">
                <input className="searchProduk" type="text" placeholder="cari produk..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                {search && (
                    <button className="clear-btn" onClick={() => setSearch("")} aria-label="Clear search">X</button>
                )}
            </div>
        </div>
        <div className="botHeader">
            <h6>ini bottom header</h6>
        </div>
    </div>
  );
};

export default Header;
