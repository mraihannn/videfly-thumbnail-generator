# Penjelasan Proyek Videfly Thumbnail Generator

## Deskripsi Proyek

Videfly Thumbnail Generator adalah aplikasi web yang memungkinkan pengguna untuk menghasilkan thumbnail animasi dan mengekstrak metadata dari video berdasarkan URL yang diberikan. Aplikasi ini menggunakan berbagai teknologi seperti Node.js, Express.js, FFmpeg, dan MinIO untuk mencapai tujuannya.

## Struktur Proyek

Berikut adalah struktur folder dan file dalam proyek ini beserta penjelasannya:

```
videfly-thumbnail-generator/
├── data/
│   └── metadata.json
├── src/
│   ├── controllers/
│   │   ├── metadataController.js
│   │   └── videoController.js
│   ├── frontend/
│   │   ├── app.js
│   │   ├── index.html
│   │   └── styles.css
│   ├── routes/
│   │   └── videoRoutes.js
│   ├── services/
│   │   ├── frameExtractor.js
│   │   ├── metadataServices.js
│   │   └── videoServices.js
│   ├── app.js
│   └── server.js
```

### Penjelasan File

#### data/metadata.json

File ini berisi metadata video yang telah dihasilkan oleh aplikasi. Metadata ini berupa JSON yang berisi informasi seperti judul video, deskripsi, durasi, dan lain-lain.

#### src/controllers/metadataController.js

File ini berisi controller untuk menghandle request metadata video. Controller ini akan mengambil metadata dari database dan mengembalikannya dalam format JSON.

#### src/controllers/videoController.js

File ini berisi controller untuk menghandle request video. Controller ini akan mengambil URL video dari request, menghasilkan thumbnail animasi, dan mengembalikan thumbnail tersebut dalam format GIF.

#### src/frontend/app.js

File ini berisi kode JavaScript untuk frontend aplikasi. Kode ini akan menghandle interaksi pengguna dengan aplikasi, seperti mengirimkan request untuk menghasilkan thumbnail dan menampilkan hasilnya.

#### src/frontend/index.html

File ini berisi kode HTML untuk frontend aplikasi. Kode ini akan menampilkan form untuk memasukkan URL video dan tombol untuk menghasilkan thumbnail.

#### src/frontend/styles.css

File ini berisi kode CSS untuk frontend aplikasi. Kode ini akan mengatur gaya dan layout dari frontend aplikasi.

#### src/routes/videoRoutes.js

File ini berisi route untuk menghandle request video. Route ini akan memanggil controller videoController untuk menghasilkan thumbnail animasi.

#### src/services/frameExtractor.js

File ini berisi service untuk menghasilkan frame dari video. Service ini akan menggunakan FFmpeg untuk menghasilkan frame dari video.

#### src/services/metadataServices.js

File ini berisi service untuk menghasilkan metadata dari video. Service ini akan menggunakan FFmpeg untuk menghasilkan metadata dari video.

#### src/services/videoServices.js

File ini berisi service untuk menghasilkan thumbnail animasi dari video. Service ini akan menggunakan frame yang dihasilkan oleh frameExtractor dan metadata yang dihasilkan oleh metadataServices untuk menghasilkan thumbnail animasi.

#### src/app.js

File ini berisi kode utama aplikasi. Kode ini akan menginisialisasi Express.js dan mengatur route untuk menghandle request.

#### src/server.js

File ini berisi kode untuk menjalankan server aplikasi. Kode ini akan menjalankan aplikasi Express.js dan mengatur port untuk mendengarkan request.
