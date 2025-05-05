# Videfly Thumbnail Generator

Videfly Thumbnail Generator adalah aplikasi web yang memungkinkan pengguna untuk menghasilkan thumbnail animasi dan mengekstrak metadata dari video berdasarkan URL yang diberikan.

## Fitur Utama

1. Menghasilkan thumbnail animasi dari video
2. Mengekstrak metadata video (durasi, resolusi, codec, bitrate, frame rate)
3. Menyimpan thumbnail di penyimpanan MinIO
4. Menyimpan metadata di file JSON lokal

## Teknologi yang Digunakan

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- Pemrosesan Video: FFmpeg
- Penyimpanan Objek: MinIO
- Lainnya: Axios untuk permintaan HTTP

## Cara Menjalankan Aplikasi

1. Pastikan Node.js dan FFmpeg sudah terinstal di sistem Anda.
2. Clone repositori ini.
3. Buka terminal dan navigasi ke direktori proyek.
4. Jalankan `npm install` untuk menginstal semua dependensi.
5. Konfigurasikan kredensial MinIO di `src/utils/minioStorage.js`.
6. Jalankan `node index.js` untuk memulai server.
7. Buka browser dan akses `http://localhost:3000`.

## Struktur Proyek

- `src/`: Kode sumber utama
  - `controllers/`: Pengendali untuk menangani permintaan HTTP
  - `routes/`: Definisi rute API
  - `services/`: Logika bisnis utama
  - `utils/`: Fungsi utilitas
  - `frontend/`: File-file frontend
- `data/`: Penyimpanan file metadata JSON
- `temp/`: Direktori sementara untuk video dan frame

## Penggunaan

1. Buka aplikasi di browser.
2. Masukkan URL video yang ingin diproses.
3. Klik tombol "Generate Thumbnail and Metadata".
4. Tunggu proses selesai. Thumbnail animasi dan metadata akan ditampilkan.

## Catatan Penting

- Proyek ini menggunakan MinIO playground untuk demonstrasi. Untuk penggunaan produksi, gunakan instance MinIO yang aman dan terkonfigurasi dengan benar.
- Pastikan Anda memiliki hak untuk mengakses dan memproses video yang digunakan.

## Kontribusi

Kontribusi selalu diterima. Silakan buat pull request atau laporkan masalah jika Anda menemukan bug atau memiliki saran perbaikan.

## Lisensi

Proyek ini dilisensikan di bawah lisensi ISC.
