// ContentProduct.js
import React, { useState, useEffect } from "react";
import "../css/ContentProduct.css";
import { useNavigate } from "react-router-dom";
import imageProduk from "../assets/ecLogoBlack.png"; 
import imageProdukPromo from "../assets/promoMark.png"; 
import imageNavbarPromo from "../assets/pamfletPromo.jpg"; 
import imageNavbarPromo2 from "../assets/pamfletPromo2.jpg"; 

const ContentProduct = () => {
  const [produk, setProduk] = useState({ rekomendasi: [], terlaris: [], palingDicari: [] });
  const [loading, setLoading] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const promoImages = [imageNavbarPromo, imageNavbarPromo2, imageProduk];
  const navigate = useNavigate();

  // Dummy data berbeda untuk tiap kategori
  const dummyProdukRekomendasi = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    uniqueId: `rekom-${i + 1}`,
    nama: `Produk Rekomendasi ${i + 1}`,
    harga: (i + 1) * 12000,
    promo: i % 3 === 0 ? "Ya" : ""
  }));

  const dummyProdukTerlaris = Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    uniqueId: `terlaris-${i + 1}`,
    nama: `Produk Terlaris ${i + 1}`,
    harga: (i + 1) * 15000,
    promo: i % 2 === 0 ? "Ya" : ""
  }));

  const dummyProdukPalingDicari = Array.from({ length: 10 }, (_, i) => ({
    id: i + 21,
    uniqueId: `dicari-${i + 1}`,
    nama: `Produk Paling Dicari ${i + 1}`,
    harga: (i + 1) * 18000,
    promo: i % 4 === 0 ? "Ya" : ""
  }));

  // Simulasi fetch
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProduk({
        rekomendasi: dummyProdukRekomendasi,
        terlaris: dummyProdukTerlaris,
        palingDicari: dummyProdukPalingDicari
      });
      setLoading(false);
    }, 0);
  }, []);

  // Slider promo
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

  // Fungsi render produk
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

          {/* Rekomendasi */}
          <div id="containerProduct">
            <dir className={"contentProductTittle"}>
              <h5>Rekomendasi</h5>
              <h5 className="contentProductTittleLihat" onClick={() => navigate('/')}>lihat semua{">"}</h5>
            </dir>
            <div className="mainProductRekomendasi">
              {loading ? <h6>Memuat produk...</h6> : (produk.rekomendasi.length > 0 ? renderProduk(produk.rekomendasi) : <h5 className="no-product">Tidak ada produk yang sesuai</h5>)}
            </div>
          </div>

          {/* Terlaris */}
          <div id="containerProduct">
          <dir className={"contentProductTittle"}>
              <h5>Terlaris</h5>
              <h5 className="contentProductTittleLihat" onClick={() => navigate('/')}>lihat semua{">"}</h5>
            </dir>
            <div className="mainProductRekomendasi">
              {loading ? <h6>Memuat produk...</h6> : (produk.terlaris.length > 0 ? renderProduk(produk.terlaris) : <h5 className="no-product">Tidak ada produk yang sesuai</h5>)}
            </div>
          </div>

          {/* Paling Dicari */}
          <div id="containerProduct">
          <dir className={"contentProductTittle"}>
              <h5>Paling dicari</h5>
              <h5 className="contentProductTittleLihat" onClick={() => navigate('/')}>lihat semua{">"}</h5>
            </dir>
            <div className="mainProductRekomendasi">
              {loading ? <h6>Memuat produk...</h6> : (produk.palingDicari.length > 0 ? renderProduk(produk.palingDicari) : <h5 className="no-product">Tidak ada produk yang sesuai</h5>)}
            </div>
          </div>

        </div>
        <div className="mainIklan">
          <h5>ini iklan</h5>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
