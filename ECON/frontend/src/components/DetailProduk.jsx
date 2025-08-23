import { useLocation } from "react-router-dom";

const DetailProduk = () => {

    const search = new URLSearchParams(useLocation().search);
    const id = search.get("id");

    return (
        <>
            <h1>Detail Produk ID: {id}</h1>
        </>
    )
}

export default DetailProduk


