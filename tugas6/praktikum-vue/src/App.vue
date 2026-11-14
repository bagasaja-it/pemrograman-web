<script setup>
import { ref, computed } from 'vue'

// Menyimpan data buku
const daftarBuku = ref([])

// Menyimpan data input
const judulBuku = ref('')
const kategoriBuku = ref('')
const kategoriKustom = ref('')
const statusBaca = ref(false)

// Menghitung jumlah buku yang sudah selesai dibaca
const jumlahSelesai = computed(() => {
  return daftarBuku.value.filter(buku => buku.sudahDibaca).length
})

// Menambahkan buku ke daftar
function tambahBuku() {
  const kategoriFinal = kategoriBuku.value === 'Lainnya'
    ? kategoriKustom.value.trim()
    : kategoriBuku.value

  if (judulBuku.value.trim() === '' || kategoriFinal === '') {
    alert('Judul dan kategori buku harus diisi!')
    return
  }

  daftarBuku.value.push({
    id: Date.now(),
    judul: judulBuku.value.trim(),
    kategori: kategoriFinal,
    sudahDibaca: statusBaca.value
  })

  // Mengosongkan form setelah buku ditambahkan
  judulBuku.value = ''
  kategoriBuku.value = ''
  kategoriKustom.value = ''
  statusBaca.value = false
}
</script>

<template>
  <div class="page-wrapper">
    <main class="container">
      <header>
        <h1>Perpustakaan BukuMu</h1>
        <p>selesaikan wishlist membaca bukumu.</p>
      </header>

      <section class="form-section">
        <h2>Wishlist BukuMu</h2>

        <form @submit.prevent="tambahBuku">
          <label for="judul">Judul Buku</label>
          <input
            id="judul"
            type="text"
            v-model="judulBuku"
            placeholder="Masukkan judul buku"
          />

          <label for="kategori">Kategori Buku</label>
          <select id="kategori" v-model="kategoriBuku">
            <option value="Novel">Novel</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Psikolog">Psikolog</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Sejarah">Sejarah</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <input
          v-if="kategoriBuku === 'Lainnya'"
          type="text"
          v-model="kategoriKustom"
          placeholder="Masukkan kategori buku lainnya"
/>
          <label class="checkbox">
            <input type="checkbox" v-model="statusBaca" />
            Selesai dibaca
          </label>

          <button type="submit">Tambah</button>
        </form>
      </section>

      <section class="daftar-section">
        <h2>Daftar Buku</h2>

        <p class="jumlah">
          Selesai dibaca:
          <strong>{{ jumlahSelesai }}</strong>
          dari
          <strong>{{ daftarBuku.length }}</strong> buku
        </p>

        <div v-if="daftarBuku.length === 0" class="kosong">
          Silahkan tambahkan wishlist bukumu terlebih dahulu.
        </div>

        <div v-for="buku in daftarBuku" :key="buku.id" class="buku-card">
          <h3>{{ buku.judul }}</h3>
          <p class="kategori-text">Kategori: {{ buku.kategori }}</p>
          <span :class="['badge', buku.sudahDibaca ? 'selesai' : 'belum']">
            {{ buku.sudahDibaca ? 'Sudah Dibaca' : 'Belum Dibaca' }}
          </span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Latar belakang halaman luar */
.page-wrapper {
  min-height: 100vh;
  background-color: #EEF2F6;
  padding: 40px 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  color: #334155;
}

/* Header */
header {
  background-color: #1E3A8A;
  text-align: center;
  padding: 28px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border-bottom: 4px solid #DBEAFE;
  box-shadow: 0 4px 12px rgb(0, 0, 0);
}

header h1 {
  color: #F8FAFC;
  margin: 0 0 8px 0;
  font-size: 1.8rem;
}

header p {
  color: #CBD5E1;
  margin: 0;
  font-size: 0.95rem;
}

/* Container Form & Daftar Buku */
.form-section,
.daftar-section {
  background: #DBEAFE;
  padding: 25px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid #1E3A8A;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

h2 {
  color: #000000;
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.25rem;
  border-bottom: 2px solid #2563EB;
  padding-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #000000;
}

input[type="text"],
select {
  padding: 11px 12px;
  background-color: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  color: #000000;
  font-size: 0.95rem;
  transition: border-color 0.2s, background-color 0.2s;
}

input[type="text"]:focus,
select:focus {
  outline: none;
  background-color: #FFFFFF;
  border-color: #1E3A8A;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
  margin-top: 4px;
}

/* Tombol tambah */
button {
  padding: 12px;
  margin-top: 6px;
  border: none;
  border-radius: 8px;
  background: #0F766E;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #115E59;
}

/* Paragraf informatif jumlah buku */
.jumlah {
  background: #EFF6FF;
  color: #000000;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #1E3A8A;
  font-size: 0.95rem;
}

/* Kartu buku */
.buku-card {
  background-color: #EFF6FF;
  padding: 16px 18px;
  margin-top: 14px;
  border: 1px solid #E7E5E4;
  border-left: 4px solid #1E3A8A;
  border-radius: 8px;
}

.buku-card h3 {
  margin: 0 0 6px 0;
  color: #1E293B;
  font-size: 1.1rem;
}

.kategori-text {
  margin: 0 0 10px 0;
  color: #64748B;
  font-size: 0.9rem;
}

/* Badge Status Baca */
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.selesai {
  background-color: #FFFFFF;
  color: #008000;
}

.belum {
  background-color: #FFFFFF;
  color: #FF0000;
}

/* Paragraf informatif saat daftar masih kosong */
.kosong {
  background-color: #F8FAFC;
  color: #64748B;
  text-align: center;
  padding: 28px 20px;
  border-radius: 8px;
  border: 1px dashed #CBD5E1;
  font-size: 0.95rem;
}
</style>