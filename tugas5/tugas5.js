// Menggunakan GitHub REST API untuk mengambil data profil berdasarkan username (API publik: https://api.github.com/users/{username})
// Mengambil elemen HTML yang akan digunakan dalam proses pencarian dan penampilan profil.
const form = document.getElementById("form-cari");
const inputUsername = document.getElementById("username");
const tombolCari = document.getElementById("tombol-cari");

const elLoading = document.getElementById("loading");
const elPesan = document.getElementById("pesan");
const elProfil = document.getElementById("profil");

const elAvatar = document.getElementById("avatar");
const elNama = document.getElementById("nama");
const elLogin = document.getElementById("login");
const elBio = document.getElementById("bio");
const elRepo = document.getElementById("repo");
const elLink = document.getElementById("link");


// Menyembunyikan tiga kondisi (loading, pesan, profil) 
const resetTampilan = () => {
    elLoading.hidden = true;
    elPesan.hidden = true;
    elProfil.hidden = true;
};

// Kondisi: pesan kesalahan
const tampilkanPesan = (teks) => {
    elPesan.textContent = teks;
    elPesan.hidden = false;
};

// Kondisi: data berhasil ditampilkan
const tampilkanProfil = (data) => {
    // Destructuring: hanya mengambil properti yang dibutuhkan
    const { avatar_url, name, login, bio, public_repos, html_url } = data;

    elAvatar.src = avatar_url;
    elAvatar.alt = `Avatar ${login}`;
    elNama.textContent = name || login; // kalau nama kosong, pakai username
    elLogin.textContent = `@${login}`;
    elBio.textContent = bio || "Tidak ada bio."; // kalau bio kosong, beri teks pengganti
    elRepo.textContent = public_repos;
    elLink.href = html_url;

    elProfil.hidden = false;
};

// Panggil API
const cariUser = async (username) => {
    resetTampilan();
    elLoading.hidden = false;      // kondisi: loading
    tombolCari.disabled = true;    // cegah klik ganda saat request berjalan

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        // Memeriksa status respons API untuk menangani berbagai kondisi kesalahan
        if (response.status === 404) {
            tampilkanPesan("User tidak ditemukan");
            return;
        }

        if (response.status === 403) {
            tampilkanPesan("Batas permintaan API tercapai. Coba lagi beberapa menit lagi.");
            return;
        }

        if (!response.ok) {
            tampilkanPesan(`Terjadi kesalahan (status ${response.status}).`);
            return;
        }

        const data = await response.json();
        tampilkanProfil(data);

    // Menangani kesalahan yang terjadi selama proses permintaan API
    } catch (error) {
    console.error("Terjadi kesalahan:", error);
    tampilkanPesan("Gagal mengambil data. Periksa koneksi atau coba lagi.");
    // Mengembalikan tampilan loading dan tombol ke kondisi normal
    } finally {
        elLoading.hidden = true;
        tombolCari.disabled = false;
    }
};

// Menambahkan event listener untuk mendeteksi dan menangani pengiriman form
form.addEventListener("submit", (event) => {
    event.preventDefault(); event.preventDefault(); // Mencegah halaman dimuat ulang agar proses pencarian berjalan sesuai input pengguna
    const username = inputUsername.value.trim(); // Mengambil username dari input dan menghapus spasi di awal maupun akhir

    // Memeriksa apakah username sudah diisi sebelum pencarian dilakukan
    if (username === "") {
        resetTampilan();
        tampilkanPesan("Username tidak boleh kosong.");
        return;
    }

    cariUser(username);
});