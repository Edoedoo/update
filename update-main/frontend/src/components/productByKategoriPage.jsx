import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";


const ProductByKategoriPage = () => {
    const { getProductByKategori, formatRupiah, produkTerpopuler } = useContext(DataContext);
    const {kategoriId} = useParams ();
    const produkKategori = getProductByKategori(kategoriId);
    return (
        <div>
            <h1>halaman kategori, dengan ID KATEGORI: {kategoriId}</h1>
            {produkKategori.map((item, i) => (
                <div key={item.id}>
                    <h6>{item.nama_produk}</h6>
                </div>
            ))}
        </div>  
    )
}

export default ProductByKategoriPage


