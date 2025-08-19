import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getBackendURL } from "../Utils";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [listKategori1, setListKategori1] = useState([]);
    const [listSubKategori1, setListSubKategori1] = useState([]);


    // FORMAT RUPIAH
    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

    // DROPDOWN NAVBAR FRONTEND (KATEGORI DAN SUBKATEGORI)
    const getListKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listKategori`);
            setListKategori1(res.data);
        } catch (err) {
            console.error("Error mengambil kategori produk:", err);
        }
    };

    const getListSubKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listSubKategori`);
            setListSubKategori1(res.data);
        } catch (err) {
            console.error("Error mengambil subKategori produk:", err);
        }
    };

    // SEMUA PRODUK
    const getAllProduct = async ({ kategoriid, subkategoriid, limit = 30, page = 1 }) => {
        try {
            const params = new URLSearchParams();
            if (kategoriid !== undefined && kategoriid !== null) params.append("kategoriid", kategoriid);
            if (subkategoriid !== undefined && subkategoriid !== null) params.append("subkategoriid", subkategoriid);
            params.append("limit", limit);
            params.append("page", page);

            const res = await axios.get(`${getBackendURL()}/semuaProduk?${params.toString()}`);
            return res.data;
        } catch (err) {
            console.error("Error mengambil semua produk:", err);
        }
    };

 
    // PRODUK REKOMENDASI
    const getProdukRekomendasi = async ({ limit = 30, page = 1 }) => {
        try {
            const res = await axios.get(`${getBackendURL()}/listProdukRekomendasi?limit=${limit}&page=${page}`);
            return res.data;
        } catch (err) {
            console.error("Error mengambil produk rekomendasi:", err);
        }
    };

    // PRODUK TERMURAH
    const getProdukTermurah = async({ limit = 30, page = 1}) => {
        try {
            const res = await axios.get(`${getBackendURL()}/listProdukHargaTermurah?limit=${limit}&paga=${page}`);
            return res.data
        } catch (err) {
            console.error("Error mengambil produk termurah:", err)
        }
    }
    





    useEffect(() => {
        getListKategori();
        getListSubKategori();
    }, []);

    return (
        <DataContext.Provider
            value={{
                listKategori1,
                listSubKategori1,

                getProdukRekomendasi,
                getProdukTermurah,
                getListKategori,
                getListSubKategori,
                getAllProduct,
                formatRupiah,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
