import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { DataProvider } from "./globalState/FetchDataGlobal";
import LoginPage from "./pages/Login";
import MenuPage from "./components/ContentProduct";
import NotFoundPages from "./pages/NotFound";
import DetailProduk from "./components/DetailProduk";
import ProductByKategoriPage from "./components/productByKategoriPage";
import ProductBySubKategoriPage from "./components/productBySubKategoriPage";
import ProductByTopRate from "./components/ProductByTopRate";
import ProductByLowPrice from "./components/ProductByLowPrice";
import SearchProdukPage from "./components/SearchProdukPage";
import Setting from "./components/Setting";
import HelpPage from "./components/HelpPage";

export default function App() {
  return (
    <Router>
      {/* Bungkus semua route dengan DataProvider */}
      <DataProvider>
        <Routes>
          {/* Layout Utama */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<MenuPage />} />
            <Route path="/limit/:limit/page/:page/kategori/:kategoriId" element={<ProductByKategoriPage />} />
            <Route path="/limit/:limit/page/:page/kategori/:kategoriId/subkategori/:subkategoriId" element={<ProductBySubKategoriPage />} />
            <Route path="/limit/:limit/page/:page/kategori/:kategoriId/subkategori/:subkategoriId/toprate/:toprate" element={<ProductByTopRate />}/>
            <Route path="/limit/:limit/page/:page/kategori/:kategoriId/subkategori/:subkategoriId/toprate/:toprate/lowerprice/:lowerprice" element={<ProductByLowPrice />}/>
            <Route path="/cari"element={< SearchProdukPage/>}/>
            <Route path="/detailProduk" element={<DetailProduk />} />
            <Route path="/pengaturan" element={<Setting/> } />
            <Route path="/bantuan" element={<HelpPage />} />
          </Route>

          {/* Layout Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Halaman 404 */}
          <Route path="*" element={<NotFoundPages />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}
