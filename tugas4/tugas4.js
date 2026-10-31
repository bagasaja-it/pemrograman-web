// 1. Data: array of objects
const transaksi = [
    { id: 1, barang: "Rawon", harga: 10000, qty: 2, kategori: "Makanan" },
    { id: 2, barang: "Pecel", harga: 10000, qty: 4, kategori: "Makanan" },
    { id: 3, barang: "Jus Jambu", harga: 5000, qty: 6, kategori: "Minuman" },
    { id: 4, barang: "Kopi", harga: 3000, qty: 10, kategori: "Minuman" },
    { id: 5, barang: "Yamaha Mio", harga: 19000000, qty: 2, kategori: "Motor" },
    { id: 6, barang: "Honda Beat", harga: 23000000, qty: 1, kategori: "Motor" },
    { id: 7, barang: "Lamborghini Aventador", harga: 6000000000, qty: 1, kategori: "Mobil" },
    { id: 8, barang: "Lamborghini Huracan", harga: 5400000000, qty: 1, kategori: "Mobil" }
];

// Fungsi bantu untuk menampilkan angka sebagai rupiah
const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;

// filter(): menyaring data berdasarkan kategori
// Destructuring dipakai di parameter: ({ kategori }) mengambil properti kategori
const filterKategori = (data, namaKategori) =>
    data.filter(({ kategori }) => kategori === namaKategori);

// map(): menghitung subtotal tiap barang (harga x qty)
// Hasilnya array baru yang berisi id, barang, dan subtotal
const hitungSubtotal = (data) =>
    data.map(({ id, barang, harga, qty }) => ({
        id,
        barang,
        subtotal: harga * qty
    }));

// reduce(): menjumlahkan seluruh subtotal menjadi satu angka
const hitungTotal = (data) =>
    data.reduce((total, { subtotal }) => total + subtotal, 0);

// Fungsi untuk mencetak daftar barang beserta subtotalnya
const tampilkanDaftar = (data) =>
    data.forEach(({ id, barang, subtotal }) => {
        console.log(`${id}. ${barang.padEnd(24)} ${formatRupiah(subtotal)}`);
    });


// Program utama

// a) Semua transaksi
const semuaSubtotal = hitungSubtotal(transaksi);
console.log("SEMUA TRANSAKSI");
tampilkanDaftar(semuaSubtotal);
console.log(`Total keseluruhan: ${formatRupiah(hitungTotal(semuaSubtotal))}`);

// b) Hanya kategori tertentu
const kategoriDipilih = "Motor";
const dataTersaring = filterKategori(transaksi, kategoriDipilih);
const subtotalTersaring = hitungSubtotal(dataTersaring);

console.log(`\nKATEGORI: ${kategoriDipilih.toUpperCase()}`);
tampilkanDaftar(subtotalTersaring);
console.log(`Total ${kategoriDipilih}: ${formatRupiah(hitungTotal(subtotalTersaring))}`);

// c) Destructuring array: ambil transaksi pertama dan sisanya
const [pertama, ...sisanya] = transaksi;
const { barang: namaBarang, kategori: kategoriPertama } = pertama;
console.log(`\nTransaksi pertama: ${namaBarang} (${kategoriPertama}), sisanya ${sisanya.length} transaksi`);
