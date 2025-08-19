import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";


const ProductByKategoriPage = () => {
    const {formatRupiah, getAllProduct} = useContext(DataContext);
    const [produkAllKategori, setProdukAllKategori] = useState([])
    const {kategoriId} = useParams ();
    
    useEffect(() => {
        const getTopRekomendasi = async () => {
            const data = await getAllProduct({ 
                kategoriid: parseInt(kategoriId),  
                subkategoriid: null,
                limit: 30, 
                page: 1 
            });
            setProdukAllKategori(data);
        };
        getTopRekomendasi();
    }, [kategoriId]);
    return (
        <div>
            <h1>halaman kategori, dengan ID KATEGORI: {kategoriId}</h1>
            {produkAllKategori.map((p) => (
                <div key={p.id}>
                    <h5>{p.nama_produk}</h5>
                    <h5>{p.id_kategori}</h5>
                </div>
            ))}
        </div>  
    )
}

export default ProductByKategoriPage



