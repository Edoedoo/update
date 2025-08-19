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

  const top6 = produkTerpopuler;
  const totalRekomendasi = top6.reduce((sum, item) => sum + (item.count || 0), 0);
  const produkRekomendasi = top6.map((item, i) => ({
    id: item.id_produk,
    uniqueId: `rekom-${i + 1}`,
    nama: item.nama_produk,
    harga: item.harga,
    count: item.count,
    id_kategori: item.id_kategori,
    id_subKategori: item.id_subKategori,
    deskripsi: item.deskripsi,
    rating: item.rating,
    stok: item.stok,
    berat: item.berat,
    promo: item.promo, 
    totalRekomendasi
  }));

  // Dummy untuk terlaris & paling dicari
  const produkTerlaris = Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    uniqueId: `terlaris-${i + 1}`,
    nama: `Produk Terlaris ${i + 1} `,
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
  useEffect(() => {
  promoImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);


  // Render produk card
  const renderRekomendasi = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product rekom" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
        <div className="imageProduk">
          <img className="imageProdukMain" src={imageProduk} alt={p.nama} loading="lazy" />
          {p.promo && <img className="imgPromo" src={imageProdukPromo} alt="Promo" loading="lazy" />}
        </div>
        <div className="box-identitas">
          <div className="top-box-identitas">
            <h6 className="namaProduk">{p.nama}</h6>
          </div>
          <div className="mid-box-identitas">
            <h6>mark</h6>
          </div>
          <div className="bot-box-identitas">
            <div style={{display:'flex', alignItems:'center'}}>
              <img src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.77/pc/d7099d3fd1dfdaf705ab.svg" alt="" style={{height:'35%'}}/>
              <h6 >{p.rating}</h6>
            </div>
            <h6 className="hargaProduk">{formatRupiah(p.harga)}</h6>
          </div>
          <div className="markDetailProduk"><h6>detail</h6></div>
        </div>
      </div>
    ));

  const renderTerlaris = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product terlaris" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
        <div className="imageProduk">
          <img className="imageProdukMain" src={imageProduk} alt={p.nama} loading="lazy" />
          {p.promo && <img className="imgPromo" src={imageProdukPromo} alt="Promo" loading="lazy" />}
        </div>
        <div className="box-identitas">
          <div className="top-box-identitas">
            <h6 className="namaProduk">{p.nama}</h6>
          </div>
          <div className="mid-box-identitas">
            <h6>markk</h6>
          </div>
          <div className="bot-box-identitas">
            <h6>4.5</h6>
            <h6 className="hargaProduk">{formatRupiah(p.harga)}</h6>
          </div>
          <div className="markDetailProduk"><h6>detail</h6></div>
        </div>
      </div>
    ));
  
  const renderPalingDicari = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product dicari" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
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
    const SectionProduk = ({ title, data, render, totalRekomendasi }) => (
      <div id="containerProduct">
        <div className="contentProductTittle">
          <h5>{title}</h5>
          <h5 className="contentProductTittleLihat">{`lihat semua >`}</h5>
        </div>
        {totalRekomendasi !== undefined && (
          <h6 style={{width:'100%', textAlign:'center', fontSize:'clamp(12px, 1vw, 14px)'}}><span style={{color:'#38b6ff'}}>{totalRekomendasi}</span> orang merekomendasikan produk ini</h6>
        )}
        <div className="mainProductRekomendasi">
          {data.length > 0 ? render(data) : <h5 className="no-product">Tidak ada produk</h5>}
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
            <marquee><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officiis earum reiciendis debitis eum vero quasi optio facilis tempora hic recusandae, error enim iure eius sunt, exercitationem neque repellat iste.</h4></marquee>
          </div>

          <SectionProduk title="Rekomendasi" data={produkRekomendasi} path="/" render={renderRekomendasi} totalRekomendasi={totalRekomendasi}/>
          <SectionProduk title="Terlaris" data={produkTerlaris} path="/" render={renderTerlaris} />
          <SectionProduk title="Paling Dicari" data={produkPalingDicari} path="/"render={renderPalingDicari} />
        </div>

        <div className="mainIklan">
          <h5>ini iklan</h5>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
