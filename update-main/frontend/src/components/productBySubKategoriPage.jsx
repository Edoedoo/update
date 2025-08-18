import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";


const ProductBySubKategoriPage = () => {
    const {getProductBySubKategori, formatRupiah } = useContext(DataContext);
    const {kategoriId, subkategoriId} = useParams ();
    const produkSubKategori = getProductBySubKategori(kategoriId, subkategoriId);
    return (
        <div>
            <h1>halaman kategori, dengan ID KATEGORI: {subkategoriId}</h1>
            {produkSubKategori.map((item, i) => (
                <div key={item.id}>
                    <h6>{item.nama_produk}</h6>
                </div>
            ))}
        </div>  
    )
}

export default ProductBySubKategoriPage


