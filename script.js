const STORAGE_KEY = "dinsos_pelayanan_v1";

const form = document.getElementById("serviceForm");
const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");

let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];

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
  const keyword = searchInput.value.toLowerCase().trim();
  const status = filterStatus.value;

  const filtered = data.filter(item => {
    const text = [
      item.nama, item.nik, item.kelurahan, item.layanan, item.keterangan
    ].join(" ").toLowerCase();

    return (!keyword || text.includes(keyword)) &&
           (!status || item.status === status);
  });

  tableBody.innerHTML = "";

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
      <td><button class="btn-small" onclick="hapusData('${item.id}')">Hapus</button></td>
    `;
    tableBody.appendChild(row);
  });

  emptyState.style.display = filtered.length ? "none" : "block";

  document.getElementById("totalData").textContent = data.length;
  document.getElementById("menunggu").textContent =
    data.filter(x => x.status === "Menunggu").length;
  document.getElementById("diproses").textContent =
    data.filter(x => x.status === "Diproses").length;
  document.getElementById("selesai").textContent =
    data.filter(x => x.status === "Selesai").length;
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const nik = document.getElementById("nik").value.trim();

  if (!/^\d{16}$/.test(nik)) {
    alert("NIK harus terdiri dari 16 digit angka.");
    return;
  }

  const item = {
    id: Date.now().toString(),
    nama: document.getElementById("nama").value.trim(),
    nik,
    kelurahan: document.getElementById("kelurahan").value.trim(),
    layanan: document.getElementById("layanan").value,
    status: document.getElementById("status").value,
    tanggal: document.getElementById("tanggal").value,
    keterangan: document.getElementById("keterangan").value.trim()
  };

  data.unshift(item);
  saveData();
  render();

  form.reset();
  document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];
  alert("Data berhasil disimpan.");
});

document.getElementById("resetForm").addEventListener("click", () => {
  form.reset();
  document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];
});

function hapusData(id) {
  if (!confirm("Hapus data ini?")) return;
  data = data.filter(item => item.id !== id);
  saveData();
  render();
}

document.getElementById("hapusSemua").addEventListener("click", () => {
  if (!data.length) {
    alert("Belum ada data untuk dihapus.");
    return;
  }

  if (confirm("PERINGATAN: Semua data pada browser ini akan dihapus. Lanjutkan?")) {
    data = [];
    saveData();
    render();
  }
});

searchInput.addEventListener("input", render);
filterStatus.addEventListener("change", render);

document.getElementById("exportCsv").addEventListener("click", () => {
  if (!data.length) {
    alert("Belum ada data untuk diekspor.");
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
  a.download = `data-pelayanan-dinsos-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();

  URL.revokeObjectURL(url);
});

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
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

setInterval(updateClock, 1000);
updateClock();
render();
