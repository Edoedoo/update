import { useParams } from "react-router-dom";


const ProductBySubKategoriPage = () => {

    const {kategoriId} = useParams ();

    return (
        <>
            <h1>halaman kategori, dengan ID KATEGORI: {kategoriId}</h1>
        </>
    )
}

export default ProductBySubKategoriPage


