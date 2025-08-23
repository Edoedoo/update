import { useLocation } from "react-router-dom";

const SearchProdukPage = () => {
    const search = new URLSearchParams(useLocation().search);
    const id = search.get("keyword")

    return (
        <>
            <h1>halaman search dengan keyword : {id}</h1>
        </>
    )
};

export default SearchProdukPage