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
  const { formatRupiah, getProdukRekomendasi, getProdukTermurah, getAllProduct} = useContext(DataContext);
  const [produkTerRekomendasi, setProdukTerRekomendasi] = useState([]);
  const [produkTermurah, setProduktermurah] = useState([]);
  const [semuaProduk, setSemuaProduk] = useState([]);


            // PRODUK REKOMENDASI
  const totalRekomendasi = produkTerRekomendasi.reduce((sum, item) => sum + (item.total_direkomendasikan || 0), 0)
  const produkRekomendasi = produkTerRekomendasi.map((item, i) => ({
    id: item.id_produk,
    uniqueId: `rekom-${i + 1}`,
    nama: item.produk_detail.name_produk,
    harga: item.produk_detail.harga,
    id_kategori: item.produk_detail.id_kategori,
    id_subKategori: item.produk_detail.id_subKategori,
    deskripsi: item.produk_detail.deskripsi,
    rating: item.produk_detail.rating,
    stok: item.produk_detail.stok,
    berat: item.produk_detail.berat,
    promo: item.produk_detail.promo, 
    totalRekomendasi
  }));
            // PRODUK TERMURAH
  let hargaTermurah = null;
  if (produkTermurah.length > 0) {
    hargaTermurah = produkTermurah.reduce(
      (acc, cur) => (cur.harga < acc ? cur.harga : acc),
      produkTermurah[0].harga
    );
  }
  const produkMurah = produkTermurah.map((item, i) => ({
    id: item.id,
    uniqueId: `termurah-${i + 1}`,
    nama: item.nama_produk,
    harga: item.harga,
    id_kategori: item.id_kategori,
    id_subKategori: item.id_subKategori,
    deskripsi: item.deskripsi,
    rating: item.rating,
    stok: item.stok,
    berat: item.berat,
    promo: item.promo,
  }));

  const produkSemua = semuaProduk.map((item, i) => ({
    id: item.id,
    uniqueId: `semua-${i + 1}`,
    nama: item.nama_produk,
    harga: item.harga,
    id_kategori: item.id_kategori,
    id_subKategori: item.id_subKategori,
    deskripsi: item.deskripsi,
    rating: item.rating,
    stok: item.stok,
    berat: item.berat,
    promo: item.promo,
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

  useEffect(() => {
      const getTopRekomendasi = async () => {
        const data = await getProdukRekomendasi({ limit: 6, page: 1 });
        setProdukTerRekomendasi(data); 
      };
      
      const gettTopTermurah = async () => {
        const data = await getProdukTermurah({ limit: 6, page: 1 });
        setProduktermurah(data)
      }

      const gettSemuaProduk = async () => {
        const data = await getAllProduct({ limit: 30, page: 1 });
        setSemuaProduk(data)
      }

      getTopRekomendasi();
      gettTopTermurah();
      gettSemuaProduk();
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

  const renderTermurah = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product termurah" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
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
  
  const renderSemua = (produkArray) =>
    produkArray.map((p) => (
      <div key={p.uniqueId} className="product semua" onClick={() => navigate(`/detailProduk?id=${p.id}`)}>
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


  // Reusable section
    const SectionProduk = ({ title, data, render, totalRekomendasi, hargaTermurah }) => (
      <div id="containerProduct">
        <div className="contentProductTittle">
          <h5>{title}</h5>
          <h5 className="contentProductTittleLihat">{`lihat semua >`}</h5>
        </div>
        {totalRekomendasi !== undefined && (
          <h6 style={{width:'100%', textAlign:'center', fontSize:'clamp(12px, 1vw, 14px)'}}><span style={{color:'#38b6ff'}}>{totalRekomendasi}</span> orang merekomendasikan produk ini</h6>
        )}
        {hargaTermurah !== undefined && (
          <h6 style={{width:'100%', textAlign:'center', fontSize:'clamp(12px, 1vw, 14px)'}}>mulai dari harga <span style={{color:'#38b6ff'}}>{formatRupiah(hargaTermurah)}</span></h6>
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

          <SectionProduk
            title="Rekomendasi" 
            data={produkRekomendasi} 
            path="/" 
            render={renderRekomendasi} 
            totalRekomendasi={totalRekomendasi}
            />
          <SectionProduk title="Termurah" data={produkMurah} path="/" render={renderTermurah} hargaTermurah={hargaTermurah}/>
          <SectionProduk title="Semua Produk" data={produkSemua} path="/"render={renderSemua} />
        </div>

        <div className="mainIklan">
          <h5>ini iklan</h5>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
