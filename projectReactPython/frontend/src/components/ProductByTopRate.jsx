import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";


const ProductByTopRate = () => {
    const {formatRupiah, getAllProduct} = useContext(DataContext);
    const [produkAllKategori, setProdukAllKategori] = useState([])
    const {toprate, kategoriId, subkategoriid} = useParams ();
    
    useEffect(() => {
        const getTopRekomendasi = async () => {
            const data = await getAllProduct({ 
                toprate: toprate,
                kategoriid: parseInt(kategoriId),  
                subkategoriid: subkategoriid,
                limit: 30, 
                page: 1 
            });
            setProdukAllKategori(data);
        };
        getTopRekomendasi();
    }, [kategoriId]);
    return (
        <div>
            <h1>halaman Produk Toprate dengan id: {kategoriId}</h1>
            {produkAllKategori.map((p) => (
                <div key={p.id}>
                    <h5>{p.nama_produk}</h5>
                    <h5>{p.rating}</h5>
                </div>
            ))}
        </div>  
    )
}

export default ProductByTopRate



