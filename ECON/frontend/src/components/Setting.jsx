import React, { useState } from "react";

const Setting = () => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [darkMode, setDarkMode] = useState(false);

  const fontOptions = ["sans-serif", "serif", "monospace", "cursive"];

  return (
    <div
      className="p-6 rounded-xl shadow-md w-full max-w-xl mx-auto"
      style={{
        backgroundColor: darkMode ? "#1a1a1a" : bgColor,
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <h2 className="text-2xl font-bold mb-4">Pengaturan Marketplace</h2>

      {/* Akun */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Akun</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Ubah Nama
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Ubah Email
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Ubah Password
        </button>
      </div>

      {/* Notifikasi */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Notifikasi</h3>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" /> Email Notifikasi
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Push Notifikasi
        </label>
      </div>

      {/* Tampilan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tampilan</h3>
        <div className="mb-4">
          <label className="block mb-1">Warna Background:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-16 h-8 cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Warna Teks:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-16 h-8 cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Jenis Font:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {fontOptions.map((font, index) => (
              <option key={index} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />{" "}
            Mode Gelap
          </label>
        </div>
      </div>

      {/* Bahasa */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Bahasa</h3>
        <select className="border px-2 py-1 rounded">
          <option>Indonesia</option>
          <option>English</option>
          <option>Mandarin</option>
        </select>
      </div>

      {/* Privasi */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Privasi & Keamanan</h3>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" /> Autentikasi Dua Langkah
        </label>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Keluar dari Semua Perangkat
        </button>
      </div>
    </div>
  );
};

export default Setting;
