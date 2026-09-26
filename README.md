# Aplikasi Pelayanan Dinas Sosial — V2.0

Aplikasi web modern untuk pendataan dan manajemen pelayanan Dinas Sosial. Dilengkapi dengan sistem login admin, kemampuan edit data, dan export ke berbagai format.

**🌐 Demo Live:** Akses aplikasi di GitHub Pages setelah deploy

---

## 🆕 Fitur Baru di Versi 2.0

✅ **Login Admin**
- Autentikasi sederhana dengan username & password
- Session management berbasis localStorage
- Keamanan dasar untuk akses aplikasi
- Demo credentials: `admin` / `admin123`

✅ **Edit Data**
- Ubah data pelayanan yang sudah tersimpan
- Form otomatis terisi dengan data lama
- Konfirmasi perubahan data
- Riwayat perubahan (berbasis timestamp ID)

✅ **Export Excel**
- Unduh data ke format `.xls` (Microsoft Excel)
- Kompatibel dengan Excel 2003+
- Format rapi dengan header dan styling dasar
- Backup data lebih fleksibel

✅ **Tampilan Profesional**
- UI/UX modern dengan desain enterprise
- Gradient header yang elegan
- Card-based layout yang rapi
- Icons dan badges untuk status visual
- Responsive design (desktop, tablet, HP)

✅ **Dashboard Statistik**
- Total data pelayanan
- Breakdown per status (Menunggu, Diproses, Selesai)
- Live counter yang terupdate otomatis
- Visual statistics dengan warna berbeda

---

## 🎯 Fitur Lengkap Aplikasi

### Core Features
- 📝 **Input Data Pelayanan** — Form lengkap dengan validasi NIK 16 digit
- 🔍 **Pencarian** — Cari data berdasarkan nama, NIK, kelurahan, atau layanan
- 🏷️ **Filter Status** — Saring data berdasarkan status pelayanan
- 📋 **Manajemen Data** — Tambah, edit, hapus, atau hapus semua data
- 📊 **Export Format** — CSV dan Excel untuk backup atau laporan
- 💾 **Penyimpanan Lokal** — Data tersimpan aman di localStorage browser
- ⏰ **Live Clock** — Tampilan waktu real-time di header aplikasi

### Status Pelayanan
- **Menunggu** — Data baru, perlu ditindaklanjuti
- **Diproses** — Sedang dalam proses penanganan
- **Selesai** — Telah diselesaikan

### Jenis Pelayanan
- Puskesos Kelurahan
- PKH
- Konsultasi DTSEN
- PBI-JKN / BPJS / Jamkesda
- Bantuan Korban Bencana
- Rekomendasi Keluarga Miskin
- Disabilitas
- Lansia
- Orang Terlantar
- Anjal / Gepeng / Pengamen
- ODGJ
- Lainnya

---

## 🔐 Keamanan & Autentikasi

### Login Default
```
Username: admin
Password: admin123
```

### Fitur Keamanan Saat Ini
- Session login berbasis localStorage
- Validasi input form (NIK harus 16 digit)
- Escape HTML untuk mencegah XSS
- Konfirmasi aksi berbahaya (hapus data)
- Logout untuk clear session

⚠️ **Catatan:** Login ini adalah sederhana untuk demo. Untuk produksi, implementasikan:
- Backend authentication server
- Password encryption (bcrypt/Argon2)
- Session token dengan expiry time
- Two-factor authentication (2FA)
- Audit logging untuk setiap aksi

---

## 🚀 Cara Menggunakan

### Di Komputer Local
1. Download atau clone repository ini:
   ```bash
   git clone https://github.com/langgsimon-coder/aplikasi-pelayanan-dinsos.git
   cd aplikasi-pelayanan-dinsos
   ```

2. Buka file `index.html` dengan browser favorit
   - Double-click `index.html`
   - Atau klik kanan → Open with → Browser

3. Login dengan:
   - Username: `admin`
   - Password: `admin123`

4. Gunakan aplikasi sesuai kebutuhan

### Deploy ke GitHub Pages
1. Push repository ke GitHub (jika belum)
   ```bash
   git add .
   git commit -m "Update aplikasi pelayanan v2.0"
   git push origin main
   ```

2. Buka Settings repository → Pages

3. Pada bagian "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`

4. Klik Save

5. GitHub akan memberikan URL aplikasi (tunggu 1-2 menit)
   - Format: `https://langgsimon-coder.github.io/aplikasi-pelayanan-dinsos`

6. Share link ke user

---

## 📁 Struktur File

```
aplikasi-pelayanan-dinsos/
├── index.html          # Layout HTML aplikasi
├── style.css           # CSS styling profesional
├── script.js           # JavaScript logic (auth, CRUD, export)
├── README.md           # Dokumentasi ini
└── .gitignore          # (opsional) File yang diabaikan Git
```

### Ukuran File
- `index.html` — ~3 KB (bersih tanpa minification)
- `style.css` — ~9 KB
- `script.js` — ~17 KB
- **Total:** ~29 KB (sangat ringan, loading cepat)

---

## 💾 Data Storage

### Penyimpanan
- **Lokasi:** localStorage browser
- **Key:** `dinsos_pelayanan_v1` (data) & `dinsos_admin_auth` (session)
- **Format:** JSON
- **Kapasitas:** ~5-10 MB per browser (tergantung browser)

### Backup Data
1. Buka Developer Tools (F12)
2. Console tab, ketik:
   ```javascript
   JSON.parse(localStorage.getItem('dinsos_pelayanan_v1'))
   ```
3. Copy output dan simpan ke file `.json` sebagai backup

### Restore Data
1. Buka Console
2. Jalankan:
   ```javascript
   localStorage.setItem('dinsos_pelayanan_v1', '[paste JSON data di sini]')
   ```
3. Refresh halaman

---

## ⚙️ Konfigurasi

### Ubah Credential Login
Edit di `script.js` baris ~6:
```javascript
const ADMIN_CREDS = { username: "admin", password: "admin123" };
```

### Ubah Jenis Pelayanan
Edit di `index.html` dalam elemen `<select id="layanan">`:
```html
<option>Nama Pelayanan Baru</option>
```

### Ubah Storage Key
Edit di `script.js` baris ~1:
```javascript
const STORAGE_KEY = "dinsos_pelayanan_v1";
```

---

## 🐛 Troubleshooting

### Data tidak tersimpan
- Pastikan browser tidak dalam mode Private/Incognito
- Check localStorage setting di Privacy settings browser
- Bersihkan browser cache/cookies jika perlu

### Login tidak bisa
- Pastikan sudah ketik username dan password dengan benar
- Default: `admin` / `admin123`
- Check console (F12) untuk error message

### Export tidak jalan
- Pastikan ada data di tabel
- Coba refresh halaman terlebih dahulu
- Gunakan browser terbaru (Chrome, Firefox, Safari, Edge)

### Tampilan berantakan
- Pastikan file `style.css` berada di folder yang sama dengan `index.html`
- Clear browser cache (Ctrl+Shift+Del)
- Coba di browser lain

---

## 📋 Roadmap / Fitur Mendatang

- [ ] Backend server (Node.js/Express, Python/Django, PHP)
- [ ] Database (MySQL, PostgreSQL, MongoDB)
- [ ] Advanced authentication (JWT, OAuth2, 2FA)
- [ ] User roles (Admin, Operator, Viewer)
- [ ] Audit logging untuk tracking aksi
- [ ] Advanced reporting & analytics
- [ ] API REST untuk integrasi
- [ ] Mobile app (React Native/Flutter)
- [ ] Email notification system
- [ ] Data encryption untuk data sensitif

---

## ⚠️ Catatan Penting - Limitasi Versi Ini

**Versi ini adalah aplikasi pembelajaran** dan **BELUM cocok untuk menyimpan data pribadi masyarakat secara resmi** karena:

❌ **Data hanya tersimpan di browser** — hilang jika clear cookies/cache  
❌ **Tidak ada database server** — data tidak backup di server  
❌ **Tidak ada enkripsi** — data tersimpan plain text di localStorage  
❌ **Login sangat sederhana** — tidak aman untuk production  
❌ **Tanpa audit log** — tidak bisa track siapa yang edit apa  
❌ **Tanpa backup system** — tidak ada disaster recovery  
❌ **Tidak comply GDPR/PPDP** — belum sesuai regulasi privasi data  

### Untuk Penggunaan Resmi Dinas Sosial, Tahap Berikutnya:

✅ Implementasi **backend server** dengan teknologi matang  
✅ Gunakan **database terenkripsi** (MySQL, PostgreSQL, Oracle)  
✅ Implementasi **autentikasi aman** (OAuth2, LDAP, SAML)  
✅ Sistem **encryption end-to-end** untuk data sensitif (NIK, alamat)  
✅ **Audit logging** untuk tracking semua aksi user  
✅ **Backup & disaster recovery** dengan redundancy  
✅ Compliance dengan **GDPR, PPDP, dan regulasi lokal**  
✅ **Role-based access control** (RBAC) untuk berbagai user  
✅ **Rate limiting & intrusion detection**  
✅ Regular **security audit & penetration testing**  

---

## 📞 Support & Feedback

- Laporan bug: Buat issue di repository ini
- Saran fitur: Silakan diskusi di Discussions
- Pull request: Kontribusi sangat diterima!

---

## 📄 Lisensi

MIT License — Bebas digunakan untuk keperluan pendidikan dan komersial.

---

## 👨‍💻 Credits

**Dikembangkan oleh:** langgsimon-coder  
**Last Updated:** September 2026  
**Versi:** 2.0.0

---

**Terima kasih telah menggunakan Aplikasi Pelayanan Dinas Sosial! 🙏**
