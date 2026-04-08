# SIBERAS - Sistem Informasi Penjualan Beras

SIBERAS adalah aplikasi manajemen penjualan beras yang dirancang untuk memudahkan pemilik usaha dalam mengelola stok, transaksi, dan laporan keuangan secara terintegrasi.

## Fitur Utama

1.  **Dashboard Interaktif**: Ringkasan performa bisnis, stok, dan grafik penjualan real-time.
2.  **Manajemen Inventori**: Input barang, pengaturan harga grosir/ecer, dan pemantauan stok.
3.  **Pencatatan Transaksi**: Kelola arus masuk (restok) dan keluar (penjualan) dengan mudah.
4.  **Stock Opname**: Fitur audit untuk menyesuaikan stok fisik dengan stok sistem.
5.  **Laporan Keuangan**: Analisis laba rugi, arus kas, dan distribusi penjualan per kategori.
6.  **Integrasi AI**: Analisis cerdas untuk prediksi stok dan rekomendasi bisnis (Google Studio AI).

## Teknologi

-   **Frontend**: React + TypeScript + Vite
-   **Styling**: Tailwind CSS + shadcn/ui
-   **Database**: Supabase (PostgreSQL)
-   **AI**: Google Gemini API
-   **Animations**: Framer Motion
-   **Charts**: Recharts

## Persiapan Lingkungan

Salin file `.env.example` menjadi `.env` dan isi variabel berikut:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## Instalasi

1.  Clone repository ini.
2.  Jalankan `npm install` untuk menginstal dependensi.
3.  Jalankan `npm run dev` untuk memulai server pengembangan.
4.  Buka `http://localhost:3000` di browser Anda.

## 🚀 Deployment ke GitHub Pages

Aplikasi ini sudah dikonfigurasi untuk deploy otomatis ke GitHub Pages menggunakan GitHub Actions.

1.  **Push ke GitHub**: Unggah kode ini ke repository GitHub Anda.
2.  **Konfigurasi Secrets**: Di GitHub, buka **Settings > Secrets and variables > Actions** dan tambahkan:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
    - `GEMINI_API_KEY`
3.  **Aktifkan Pages**: Buka **Settings > Pages**, pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
4.  Setiap kali Anda melakukan `git push`, aplikasi akan otomatis diperbarui.

## 📱 Konversi ke Android Native (Roadmap)

Untuk mengubah aplikasi web ini menjadi aplikasi Android Native, kita akan menggunakan **Capacitor**:

1.  **Install Capacitor**:
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/android
    npx cap init SIBERAS com.digiscript.siberas
    ```
2.  **Build Web App**:
    ```bash
    npm run build
    ```
3.  **Tambah Platform Android**:
    ```bash
    npx cap add android
    npx cap copy
    npx cap open android
    ```
4.  Aplikasi akan terbuka di Android Studio dan siap untuk di-build menjadi `.apk` atau `.aab`.

## Pembuat

Aplikasi ini dikembangkan oleh **DigiScript Management**.

---
*© 2026 DigiScript Management - Solusi Digital untuk Bisnis Anda.*
