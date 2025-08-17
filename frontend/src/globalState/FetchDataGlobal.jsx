import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getBackendURL } from "../Utils";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [listKategori1, setListKategori1] = useState([]);
    const [listSubKategori1, setListSubKategori1] = useState([]);
    const [listProduct, setListProduct] = useState([]);

    const error = () => {
        console.log("Error mengambil data dari frrontend ke backend..")
    }
    // FORMAT RUPIAH
    const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

    //  DROPDOWN NAVBAR FRONTEND (KATEGORI DAN SUBKATEGORI)
    const getListKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listKategori`);
            setListKategori1(res.data);
        } catch (error) {
            error()
        }
    }
    
    const getListSubKategori = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/listSubKategori`);
            setListSubKategori1(res.data);
        } catch (error) {
            error()
        }
    }



    // SEMUA PRODUK
    const getAllProduct = async () => {
        try {
            const res = await axios.get(`${getBackendURL()}/semuaProduk`);
            setListProduct(res.data)
        } catch (error) {
            error()
        }
    }

    

    useEffect(() => {
        getListKategori();
        getListSubKategori();
        getAllProduct();
    }, []);



    return (
        <DataContext.Provider value={{
                listKategori1, 
                listSubKategori1, 
                listProduct,

                getListKategori,
                getListSubKategori,
                getAllProduct
            }}>
        {children}
        </DataContext.Provider>
    );
};
