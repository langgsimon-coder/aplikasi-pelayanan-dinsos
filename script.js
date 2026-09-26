const STORAGE_KEY = "dinsos_pelayanan_v1";
const AUTH_KEY = "dinsos_admin_auth";
const ADMIN_CREDS = { username: "admin", password: "admin123" };

let currentUser = null;
let isEditMode = false;
let editingId = null;

let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Check if user is logged in
function checkAuth() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    currentUser = JSON.parse(stored);
    showMainApp();
  } else {
    showLoginPage();
  }
}

function showLoginPage() {
  document.body.innerHTML = `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <div class="brand-mark">DS</div>
          <h1>Dinas Sosial</h1>
          <p>Sistem Informasi Pelayanan</p>
        </div>
        <form id="loginForm">
          <label>Username
            <input type="text" id="loginUsername" required placeholder="Masukkan username">
          </label>
          <label>Password
            <input type="password" id="loginPassword" required placeholder="Masukkan password">
          </label>
          <button class="btn primary" type="submit">Masuk ke Sistem</button>
          <p class="login-help">Demo: username <code>admin</code> | password <code>admin123</code></p>
        </form>
        <div id="loginError" class="login-error"></div>
      </div>
    </div>
  `;
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
    currentUser = { username, loginTime: new Date().toISOString() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    location.reload();
  } else {
    errorEl.textContent = "❌ Username atau password salah";
    errorEl.style.display = "block";
  }
}

function showMainApp() {
  document.body.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand-wrap">
          <div class="brand-mark" aria-hidden="true">DS</div>
          <div>
            <p class="eyebrow">SISTEM INFORMASI PELAYANAN</p>
            <h1>Dinas Sosial</h1>
            <p class="subtitle">Kelola data pelayanan masyarakat dengan mudah dan teratur.</p>
          </div>
        </div>
        <div class="topbar-meta">
          <div class="user-info">
            <span class="user-badge">👤 ${currentUser.username}</span>
            <button class="btn secondary btn-logout" onclick="logout()">Keluar</button>
          </div>
          <span class="live-indicator"><i></i> Sistem aktif</span>
          <div class="clock" id="clock"></div>
        </div>
      </header>

      <main class="container">
        <div class="page-heading">
          <div>
            <p class="eyebrow accent">RINGKASAN AKTIVITAS</p>
            <h2>Dashboard Pelayanan</h2>
            <p class="page-description">Pantau dan kelola seluruh data pelayanan dalam satu tempat.</p>
          </div>
          <div class="security-note"><span aria-hidden="true">🔒</span> Anda masuk sebagai ${currentUser.username}</div>
        </div>

        <section class="dashboard" aria-label="Ringkasan data">
          <div class="card stat-card total-card"><div class="stat-icon">◻</div><div><span>Total Data</span><strong id="totalData">0</strong><small>Semua pengajuan</small></div></div>
          <div class="card stat-card waiting-card"><div class="stat-icon">◷</div><div><span>Menunggu</span><strong id="menunggu">0</strong><small>Perlu ditindaklanjuti</small></div></div>
          <div class="card stat-card process-card"><div class="stat-icon">↻</div><div><span>Diproses</span><strong id="diproses">0</strong><small>Sedang ditangani</small></div></div>
          <div class="card stat-card done-card"><div class="stat-icon">✓</div><div><span>Selesai</span><strong id="selesai">0</strong><small>Telah diselesaikan</small></div></div>
        </section>

        <section class="card form-card">
          <div class="section-title">
            <div class="title-with-icon"><div class="section-icon">+</div><div><h2 id="formTitle">Input Data Pelayanan</h2><p id="formDesc">Tambahkan data masyarakat yang menerima atau mengajukan pelayanan.</p></div></div>
            <span class="required-note"><b>*</b> Wajib diisi</span>
          </div>
          <form id="serviceForm">
            <div class="form-grid">
              <label>Nama Lengkap <span class="label-required">*</span><input type="text" id="nama" required placeholder="Contoh: Ahmad"></label>
              <label>NIK <span class="label-required">*</span><input type="text" id="nik" maxlength="16" inputmode="numeric" required placeholder="16 digit NIK"></label>
              <label>Kelurahan <span class="label-required">*</span><input type="text" id="kelurahan" required placeholder="Nama kelurahan"></label>
              <label>Jenis Pelayanan <span class="label-required">*</span><select id="layanan" required><option value="">-- Pilih pelayanan --</option><option>Puskesos Kelurahan</option><option>PKH</option><option>Konsultasi DTSEN</option><option>PBI-JKN / BPJS / Jamkesda</option><option>Bantuan Korban Bencana</option><option>Rekomendasi Keluarga Miskin</option><option>Disabilitas</option><option>Lansia</option><option>Orang Terlantar</option><option>Anjal / Gepeng / Pengamen</option><option>ODGJ</option><option>Lainnya</option></select></label>
              <label>Status <span class="label-required">*</span><select id="status" required><option>Menunggu</option><option>Diproses</option><option>Selesai</option></select></label>
              <label>Tanggal <span class="label-required">*</span><input type="date" id="tanggal" required></label>
              <label class="full">Keterangan <span class="optional-label">(opsional)</span><textarea id="keterangan" rows="3" placeholder="Tambahkan keterangan bila diperlukan..."></textarea></label>
            </div>
            <div class="actions"><button class="btn primary" type="submit" id="submitBtn">+ Simpan Data</button><button class="btn secondary" type="button" id="resetForm">Reset Form</button><button class="btn" type="button" id="cancelEdit" style="display:none;background:#f1f5f9;color:#334155;">Batal Edit</button></div>
          </form>
        </section>

        <section class="card data-card">
          <div class="section-title data-heading"><div><p class="eyebrow accent">DATABASE PELAYANAN</p><h2>Data Pelayanan</h2><p>Kelola, cari, dan pantau data pelayanan yang tersimpan.</p></div><div class="actions"><button class="btn secondary" id="exportCsv">⬇ Export CSV</button><button class="btn secondary" id="exportExcel">📊 Export Excel</button><button class="btn danger" id="hapusSemua">🗑 Hapus Semua</button></div></div>
          <div class="filters"><div class="search-wrap"><span>🔍</span><input type="search" id="search" placeholder="Cari nama, NIK, kelurahan, atau pelayanan..."></div><select id="filterStatus"><option value="">Semua Status</option><option>Menunggu</option><option>Diproses</option><option>Selesai</option></select></div>
          <div class="table-wrap"><table><thead><tr><th>No</th><th>Tanggal</th><th>Nama</th><th>NIK</th><th>Kelurahan</th><th>Pelayanan</th><th>Status</th><th>Keterangan</th><th>Aksi</th></tr></thead><tbody id="tableBody"></tbody></table></div>
          <p class="empty" id="emptyState">Belum ada data pelayanan.</p>
        </section>
      </main>
      <footer><strong>Aplikasi Pelayanan Dinas Sosial</strong><span>•</span> Versi 2.0 <span>•</span> Data tersimpan lokal di browser</footer>
    </div>
  `;
  
  // Reinitialize after DOM is ready
  initializeApp();
}

function initializeApp() {
  const formEl = document.getElementById("serviceForm");
  const resetFormBtn = document.getElementById("resetForm");
  const cancelEditBtn = document.getElementById("cancelEdit");
  const hapusSemuaBtn = document.getElementById("hapusSemua");
  const exportCsvBtn = document.getElementById("exportCsv");
  const exportExcelBtn = document.getElementById("exportExcel");
  const searchInputEl = document.getElementById("search");
  const filterStatusEl = document.getElementById("filterStatus");

  document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];

  formEl.addEventListener("submit", (e) => handleFormSubmit(e, formEl));
  resetFormBtn.addEventListener("click", () => resetForm(formEl));
  cancelEditBtn.addEventListener("click", () => cancelEdit(formEl));
  hapusSemuaBtn.addEventListener("click", hapusSemuaData);
  exportCsvBtn.addEventListener("click", exportToCSV);
  exportExcelBtn.addEventListener("click", exportToExcel);
  searchInputEl.addEventListener("input", render);
  filterStatusEl.addEventListener("change", render);

  render();
  setInterval(updateClock, 1000);
  updateClock();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function render() {
  const searchInputEl = document.getElementById("search");
  const filterStatusEl = document.getElementById("filterStatus");
  const tableBodyEl = document.getElementById("tableBody");
  const emptyStateEl = document.getElementById("emptyState");
  
  const keyword = searchInputEl.value.toLowerCase().trim();
  const status = filterStatusEl.value;

  const filtered = data.filter(item => {
    const text = [
      item.nama, item.nik, item.kelurahan, item.layanan, item.keterangan
    ].join(" ").toLowerCase();

    return (!keyword || text.includes(keyword)) &&
           (!status || item.status === status);
  });

  tableBodyEl.innerHTML = "";

  filtered.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(item.tanggal)}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td>${escapeHtml(item.nik)}</td>
      <td>${escapeHtml(item.kelurahan)}</td>
      <td>${escapeHtml(item.layanan)}</td>
      <td><span class="badge badge-${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
      <td>${escapeHtml(item.keterangan || "-")}</td>
      <td><button class="btn-small" onclick="editData('${item.id}')">✏️ Edit</button>&nbsp;<button class="btn-small" onclick="hapusData('${item.id}')">🗑️ Hapus</button></td>
    `;
    tableBodyEl.appendChild(row);
  });

  emptyStateEl.style.display = filtered.length ? "none" : "block";

  document.getElementById("totalData").textContent = data.length;
  document.getElementById("menunggu").textContent =
    data.filter(x => x.status === "Menunggu").length;
  document.getElementById("diproses").textContent =
    data.filter(x => x.status === "Diproses").length;
  document.getElementById("selesai").textContent =
    data.filter(x => x.status === "Selesai").length;
}

function handleFormSubmit(event, formEl) {
  event.preventDefault();

  const nik = document.getElementById("nik").value.trim();

  if (!/^\d{16}$/.test(nik)) {
    alert("❌ NIK harus terdiri dari 16 digit angka.");
    return;
  }

  const item = {
    id: isEditMode ? editingId : Date.now().toString(),
    nama: document.getElementById("nama").value.trim(),
    nik,
    kelurahan: document.getElementById("kelurahan").value.trim(),
    layanan: document.getElementById("layanan").value,
    status: document.getElementById("status").value,
    tanggal: document.getElementById("tanggal").value,
    keterangan: document.getElementById("keterangan").value.trim()
  };

  if (isEditMode) {
    const index = data.findIndex(d => d.id === editingId);
    if (index !== -1) {
      data[index] = item;
      alert("✅ Data berhasil diperbarui.");
    }
    cancelEdit(formEl);
  } else {
    data.unshift(item);
    alert("✅ Data berhasil disimpan.");
  }

  saveData();
  render();
  resetForm(formEl);
}

function editData(id) {
  const item = data.find(d => d.id === id);
  if (!item) return;

  isEditMode = true;
  editingId = id;

  document.getElementById("nama").value = item.nama;
  document.getElementById("nik").value = item.nik;
  document.getElementById("kelurahan").value = item.kelurahan;
  document.getElementById("layanan").value = item.layanan;
  document.getElementById("status").value = item.status;
  document.getElementById("tanggal").value = item.tanggal;
  document.getElementById("keterangan").value = item.keterangan;

  document.getElementById("formTitle").textContent = "Edit Data Pelayanan";
  document.getElementById("formDesc").textContent = "Perbarui informasi data pelayanan yang sudah ada.";
  document.getElementById("submitBtn").textContent = "✓ Perbarui Data";
  document.getElementById("cancelEdit").style.display = "inline-block";
  document.getElementById("resetForm").style.display = "none";

  document.querySelector(".form-card").scrollIntoView({ behavior: "smooth" });
}

function cancelEdit(formEl) {
  isEditMode = false;
  editingId = null;
  resetForm(formEl);
  document.getElementById("formTitle").textContent = "Input Data Pelayanan";
  document.getElementById("formDesc").textContent = "Tambahkan data masyarakat yang menerima atau mengajukan pelayanan.";
  document.getElementById("submitBtn").textContent = "+ Simpan Data";
  document.getElementById("cancelEdit").style.display = "none";
  document.getElementById("resetForm").style.display = "inline-block";
}

function resetForm(formEl) {
  formEl.reset();
  document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];
}

function hapusData(id) {
  if (!confirm("❓ Hapus data ini? Tindakan tidak dapat dibatalkan.")) return;
  data = data.filter(item => item.id !== id);
  saveData();
  render();
  alert("✅ Data berhasil dihapus.");
}

function hapusSemuaData() {
  if (!data.length) {
    alert("⚠️ Belum ada data untuk dihapus.");
    return;
  }

  if (confirm("⚠️ PERINGATAN: Semua data pada browser ini akan dihapus. Lanjutkan?")) {
    data = [];
    saveData();
    render();
    alert("✅ Semua data berhasil dihapus.");
  }
}

function exportToCSV() {
  if (!data.length) {
    alert("⚠️ Belum ada data untuk diekspor.");
    return;
  }

  const headers = ["Tanggal", "Nama", "NIK", "Kelurahan", "Pelayanan", "Status", "Keterangan"];
  const rows = data.map(x => [
    x.tanggal, x.nama, x.nik, x.kelurahan, x.layanan, x.status, x.keterangan
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `data-pelayanan-dinsos-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();

  URL.revokeObjectURL(url);
  alert("✅ File CSV berhasil diunduh.");
}

function exportToExcel() {
  if (!data.length) {
    alert("⚠️ Belum ada data untuk diekspor.");
    return;
  }

  const headers = ["Tanggal", "Nama", "NIK", "Kelurahan", "Pelayanan", "Status", "Keterangan"];
  const rows = data.map(x => [
    x.tanggal, x.nama, x.nik, x.kelurahan, x.layanan, x.status, x.keterangan || "-"
  ]);

  let html = '<table border="1"><thead><tr>';
  headers.forEach(h => html += `<th>${escapeHtml(h)}</th>`);
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += '<tr>';
    row.forEach(cell => html += `<td>${escapeHtml(cell)}</td>`);
    html += '</tr>';
  });

  html += '</tbody></table>';

  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `data-pelayanan-dinsos-${new Date().toISOString().slice(0, 10)}.xls`;
  a.click();

  URL.revokeObjectURL(url);
  alert("✅ File Excel berhasil diunduh.");
}

function logout() {
  if (confirm("Yakin ingin keluar dari sistem?")) {
    localStorage.removeItem(AUTH_KEY);
    location.reload();
  }
}

function updateClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent =
    now.toLocaleString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}

checkAuth();
