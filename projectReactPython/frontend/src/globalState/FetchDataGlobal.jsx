import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getBackendURL } from "../Utils";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [listKategori1, setListKategori1] = useState([]);
    const [listSubKategori1, setListSubKategori1] = useState([]);
    const [listProduct, setListProduct] = useState({});
    const [topTenRate, setTopTenRate] = useState([]);
    const [produkTerpopuler, setProdukTerpopuler] = useState([]);

    const error = () => {
        console.log("Error mengambil data dari frontend ke backend..");
    };

    // FORMAT RUPIAH
    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

    // DROPDOWN NAVBAR FRONTEND (KATEGORI DAN SUBKATEGORI)
    const getListKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listKategori`);
            setListKategori1(res.data);
        } catch (err) {
            error();
        }
    };

    const getListSubKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listSubKategori`);
            setListSubKategori1(res.data);
        } catch (err) {
            error();
        }
    };

    // SEMUA PRODUK
    const getAllProduct = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/semuaProduk?limit=50&page=1`);
            setListProduct(res.data);
        } catch (err) {
            error();
        }
    };

    // PRODUK REKOMENDASI
    const getProdukRekomendasi = async () => {
    try {
        const res = await axios.get(`${getBackendURL()}/listTopProdukRekomendasi`);
        if (!listProduct || Object.keys(listProduct).length === 0) return;

        const allProducts = Object.values(listProduct)
            .flatMap(sub => Object.values(sub).flat());

        const produkMap = new Map(allProducts.map(p => [p.id, p]));

        const rekomCount = {};
        res.data.forEach(p => {
            p.list_rekomendasi.forEach(r => {
                rekomCount[r.id_produk_rekomendasi] = 
                    (rekomCount[r.id_produk_rekomendasi] || 0) + 1;
            });
        });
        
        const sorted = Object.entries(rekomCount)
        .map(([id, count]) => {
            const produk = produkMap.get(parseInt(id));
            return {
                id_produk: parseInt(id),
                nama_produk: produk ? produk.nama_produk : "Unknown",
                harga: produk ? produk.harga : 0,
                id_kategori: produk ? produk.id_kategori : null,
                id_subkategori: produk ? produk.id_subkategori : null, 
                deskripsi: produk ? produk.deskripsi : "",
                rating: produk ? produk.rating : 0,
                stok: produk ? produk.stok : 0,
                berat: produk ? produk.berat : 0,
                promo: produk ? produk.promo : null,
                count
            };
        })
        .sort((a, b) => b.count - a.count);
    

        setProdukTerpopuler(sorted);
    } catch (err) {
        error();
    }
};

    
    // PRODUK BERDASARKAN KATEGORI
    const getProductByKategori = (kategoriId) => {
        if (!listProduct[kategoriId]) return [];
        return Object.values(listProduct[kategoriId]).flat();
    };

    // PRODUK BERDASARKAN SUBKATEGORI
    const getProductBySubKategori = (kategoriId, subKategoriId) => {
        if (listProduct[kategoriId] && listProduct[kategoriId][subKategoriId]) {
            return listProduct[kategoriId][subKategoriId];
        }
        return [];
    };

    // 10 PRODUK RATING TERTINGGI
    const getProductByTopRate = (limit = 10) => {
        if (!listProduct || Object.keys(listProduct).length === 0) return [];

        const allProducts = Object.values(listProduct)
            .flatMap(sub => Object.values(sub).flat());

        const sorted = allProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        return sorted.slice(0, limit);
    };




    useEffect(() => {
        if (Object.keys(listProduct).length > 0) {
            getProdukRekomendasi();
            const topRate = getProductByTopRate(10);
            setTopTenRate(topRate);
        }
    }, [listProduct]);


    useEffect(() => {
        getListKategori();
        getListSubKategori();
    }, []);
    useEffect(() => {
        getAllProduct();
    }, [])

    return (
        <DataContext.Provider
            value={{
                listKategori1,
                listSubKategori1,
                topTenRate,
                produkTerpopuler,

                getListKategori,
                getListSubKategori,
                getAllProduct,
                getProductByKategori,
                getProductBySubKategori,
                formatRupiah,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
