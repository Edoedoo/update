import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../globalState/FetchDataGlobal";


const ProductBySubKategoriPage = () => {
    const {formatRupiah, getAllProduct} = useContext(DataContext);
    const [produkAllSubKategori, setProdukAllSubKategori] = useState([])
    const { limit, page, kategoriId, subkategoriId } = useParams();

    
    useEffect(() => {
        const getTopRekomendasi = async () => {
            const data = await getAllProduct({ 
                kategoriid: parseInt(kategoriId), 
                subkategoriid: parseInt(subkategoriId),
                limit: parseInt(limit),
                page: parseInt(page)
            });
            setProdukAllSubKategori(data);
        };
        getTopRekomendasi();
    }, [kategoriId, subkategoriId]);
    return (
        <div>
            <h1>halaman kategori, dengan ID SUBKATEGORI: {subkategoriId}</h1>
            {produkAllSubKategori.map((p) => (
                <div key={p.id}>
                    <h5>{p.nama_produk}</h5>
                    <h5>{p.id_subkategori}</h5>
                </div>
            ))}
        </div>  
    )
}

export default ProductBySubKategoriPage


