import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { DataProvider } from "./globalState/FetchDataGlobal";
import LoginPage from "./pages/Login";
import MenuPage from "./components/ContentProduct";
import NotFoundPages from "./pages/NotFound";
import DetailProduk from "./components/DetailProduk";
import ProductByKategoriPage from "./components/productByKategoriPage";
import ProductBySubKategoriPage from "./components/productBySubkategoriPage";

export default function App() {
  return (
    <Router>
      {/* Bungkus semua route dengan DataProvider */}
      <DataProvider>
        <Routes>
          {/* Layout Utama */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<MenuPage />} />
            <Route path="/kategori/:kategoriId" element={<ProductByKategoriPage />} />
            <Route path="/kategori/:kategoriId/subkategori/:subkategoriId" element={<ProductBySubKategoriPage />} />
            <Route path="/detailProduk" element={<DetailProduk />} />
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
