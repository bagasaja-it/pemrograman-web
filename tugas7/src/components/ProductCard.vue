<script setup>
import { useCartStore } from '../stores/cart'

defineProps({
  produk: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

function beliProduk(produk) {
  cartStore.tambahKeKeranjang(produk)
}
</script>

<template>
  <div class="product-card">
    <img :src="produk.gambar" :alt="produk.nama" />

    <h3>{{ produk.nama }}</h3>
    <p>{{ produk.deskripsi }}</p>
    <strong>Rp{{ produk.harga.toLocaleString('id-ID') }}</strong>

    <button @click="beliProduk(produk)">
      Beli
    </button>
  </div>
</template>


<style scoped>
.product-card {
  background: white;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
}

.product-card h3 {
  margin-bottom: 8px;
  color: #1e3a8a;
}

.product-card p {
  color: #64748b;
  font-size: 14px;
  min-height: 40px;
}

.product-card strong {
  display: block;
  margin-bottom: 14px;
  color: #1d4ed8;
}

.product-card button {
  width: 100%;
  padding: 11px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(120deg, #2563eb, #7c3aed);
  color: white;
  font-weight: 600;
  transition: 0.2s;
}

.product-card button:hover {
  background: linear-gradient(120deg, #1d4ed8, #6d28d9);
  transform: translateY(-2px);
}
</style>
