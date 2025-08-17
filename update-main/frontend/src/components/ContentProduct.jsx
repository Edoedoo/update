// ContentProduct.js
import React, { useState, useEffect, useContext } from "react";
import "../css/ContentProduct.css";
import { useNavigate } from "react-router-dom";
import imageProduk from "../assets/ecLogoBlack.png"; 
import imageProdukPromo from "../assets/promoMark.png"; 
import imageNavbarPromo from "../assets/pamfletPromo.jpg"; 
import imageNavbarPromo2 from "../assets/pamfletPromo2.jpg"; 
import { DataContext } from "../globalState/FetchDataGlobal";


const ContentProduct = () => {
  const [promoIndex, setPromoIndex] = useState(0);
  const promoImages = [imageNavbarPromo, imageNavbarPromo2, imageProduk];
  const navigate = useNavigate();
  const { formatRupiah, produkTerpopuler } = useContext(DataContext);
  // Data rekomendasi dari state global
  const produkRekomendasi = produkTerpopuler.slice(0,10).map((item, i) => ({
    id: item.id_produk,
    uniqueId: `rekom-${i + 1}`,
    nama: item.nama_produk,
    harga: item.harga,
    count: item.count
  }));

  // Dummy untuk terlaris & paling dicari
  const produkTerlaris = Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    uniqueId: `terlaris-${i + 1}`,
    nama: `Produk Terlaris ${i + 1}`,
    harga: (i + 1) * 15000,
    promo: i % 2 === 0 ? "Ya" : ""
  }));

  const produkPalingDicari = Array.from({ length: 10 }, (_, i) => ({
    id: i + 21,
    uniqueId: `dicari-${i + 1}`,
    nama: `Produk Paling Dicari ${i + 1}`,
    harga: (i + 1) * 18000,
    promo: i % 4 === 0 ? "Ya" : ""
  }));

  // Slideshow promo
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Render produk card
  const renderProduk = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
        <div className="imageProduk">
          <img className="imageProdukMain" src={imageProduk} alt={p.nama} loading="lazy" />
          {p.promo && <img className="imgPromo" src={imageProdukPromo} alt="Promo" loading="lazy" />}
        </div>
        <div className="box-identitas">
          <h6 className="namaProduk">{p.nama}</h6>
          <h6 className="hargaProduk">{formatRupiah(p.harga)}</h6>
          <div className="markDetailProduk"><h6>detail produk</h6></div>
        </div>
      </div>
    ));

  // Reusable section
  const SectionProduk = ({ title, data, path }) => (
    <div id="containerProduct">
      <div className="contentProductTittle">
        <h5>{title}</h5>
        <h5 className="contentProductTittleLihat" onClick={() => navigate(path)}>
          lihat semua {">"}
        </h5>
      </div>
      <div className="mainProductRekomendasi">
        {data.length > 0 ? renderProduk(data) : <h5 className="no-product">Tidak ada produk</h5>}
      </div>
    </div>
  );

  return (
    <div className="contentMain">
      <div className="navContent">
        <div className="navContentLeft">
          <h5>ini halaman utama</h5>
          <div className="navContentLeftIklan">
            <div className="fotoPromoContainer" style={{ transform: `translateX(-${promoIndex * 100}%)` }}>
              {promoImages.map((img, i) => (
                <div key={i} className="fotoPromo">
                  <img src={img} alt={`promo-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="navContentRight">
          <h5>untuk keterangan kanan</h5>
        </div>
      </div>

      <div className="contentProduct">
        <div className="contentProductMain">
          <div className="contentProductMainNavbar">
            <marquee><h4>ini navbar diisi marquee dan iklan</h4></marquee>
          </div>

          <SectionProduk title="Rekomendasi" data={produkRekomendasi} path="/rekomendasi"/>
          <SectionProduk title="Terlaris" data={produkTerlaris} path="/produkterlaris"/>
          <SectionProduk title="Paling Dicari" data={produkPalingDicari} path="/produkpalingdicari"/>
        </div>

        <div className="mainIklan">
          <h5>ini iklan</h5>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
