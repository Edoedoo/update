import { useParams } from "react-router-dom";


const ProductByKategoriPage = () => {
    const {subkategoriId} = useParams();

    return (
        <>
            <h1>halaman subkategori, dengan ID SUBKATEGORI {subkategoriId}</h1>
        </>
    )
}

export default ProductByKategoriPage


