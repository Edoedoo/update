import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getBackendURL } from "../Utils";
import '../global.css'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [listKategori1, setListKategori1] = useState([]);
    const [listSubKategori1, setListSubKategori1] = useState([]);
    const [listNamaProduk, setListNamaProduk] = useState([]);
    const [loading, setLoading] = useState(false);

    // FORMAT RUPIAH
    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

    // DROPDOWN NAVBAR FRONTEND (KATEGORI DAN SUBKATEGORI)
    const getListKategori = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${getBackendURL()}/listKategori`);
            setListKategori1(res.data);
        } catch (err) {
            console.error("Error mengambil kategori produk:", err);
        } finally {
            setLoading(false);
        }
    };

    const getListSubKategori = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${getBackendURL()}/listSubKategori`);
            setListSubKategori1(res.data);
        } catch (err) {
            console.error("Error mengambil subKategori produk:", err);
        } finally {
            setLoading(false);
        }
    };

    // SEMUA PRODUK
    const getAllProduct = async ({ kategoriid, subkategoriid, toprate, lowerprice, limit, page }) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (lowerprice !== undefined && lowerprice !==null) params.append("lowerprice", lowerprice);
            if (toprate !== undefined && toprate !==null) params.append("toprate", toprate);
            if (kategoriid !== undefined && kategoriid !== null) params.append("kategoriid", kategoriid);
            if (subkategoriid !== undefined && subkategoriid !== null) params.append("subkategoriid", subkategoriid);
            if (limit !== undefined && limit !== null)params.append("limit", limit);
            if (page !== undefined && page !== null)params.append("page", page);

            const res = await axios.get(`${getBackendURL()}/semuaProduk?${params.toString()}`);
            return res.data;
        } catch (err) {
            console.error("Error mengambil semua produk:", err);
        } finally {
            setLoading(false);
        }
    };

    // PRODUK REKOMENDASI
    const getProdukRekomendasi = async ({ limit , page  }) => {
        setLoading(true);
        try {
            const res = await axios.get(`${getBackendURL()}/listProdukRekomendasi?limit=${limit}&page=${page}`);
            return res.data;
        } catch (err) {
            console.error("Error mengambil produk rekomendasi:", err);
        } finally {
            setLoading(false);
        }
    };

    // PRODUK TERMURAH
    const getProdukTermurah = async ({ limit , page }) => {
        setLoading(true);
        try {
            const res = await axios.get(`${getBackendURL()}/listProdukHargaTermurah?limit=${limit}&paga=${page}`);
            return res.data;
        } catch (err) {
            console.error("Error mengambil produk termurah:", err);
        } finally {
            setLoading(false);
        }
    };

    const getListNamaProduk = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listNamaProduk`);
            setListNamaProduk(res.data)
        } catch (error) {
            console.error("Error mengambil list nama produk:", error);
        }
    };

    useEffect(() => {
        getListKategori();
        getListSubKategori();
        getListNamaProduk();
    }, []);

    return (
        <DataContext.Provider
            value={{
                listKategori1,
                listSubKategori1,
                loading,
                listNamaProduk,

                
                getProdukRekomendasi,
                getProdukTermurah,
                getListKategori,
                getListSubKategori,
                getAllProduct,
                formatRupiah,    
                setLoading,
                
            }}
        >
            {children}

            {loading && (
                <div className="overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </DataContext.Provider>
    );
};
