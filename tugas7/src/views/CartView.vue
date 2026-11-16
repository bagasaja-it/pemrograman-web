<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <section class="cart">
    <h1>Keranjang Belanja</h1>

    <div v-if="cartStore.items.length === 0" class="kosong">
      Keranjang belanjamu masih kosong.
    </div>

    <div v-else>
      <div
        v-for="(produk, index) in cartStore.items"
        :key="index"
        class="cart-item"
      >
        <img :src="produk.gambar" :alt="produk.nama" />

        <div>
          <h3>{{ produk.nama }}</h3>
          <p>{{ produk.deskripsi }}</p>
          <strong>
            Rp{{ produk.harga.toLocaleString('id-ID') }}
          </strong>
        </div>
      </div>

      <h2>
        Total: Rp{{ cartStore.items.reduce((total, produk) => total + produk.harga, 0).toLocaleString('id-ID') }}
      </h2>
    </div>
  </section>
</template>


<style scoped>
.cart {
  padding: 24px;
}

.cart h1 {
  color: #1e3a8a;
  margin-bottom: 24px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px;
  margin-top: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

.cart-item img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
}

.cart-item h3 {
  color: #1e3a8a;
  margin-bottom: 8px;
}

.cart-item p {
  color: #64748b;
  margin-bottom: 10px;
}

.cart-item strong {
  color: #2563eb;
}

.cart h2 {
  margin-top: 24px;
  padding: 18px;
  background: #dbeafe;
  color: #1e3a8a;
  border-radius: 10px;
}

.kosong {
  margin-top: 20px;
  padding: 35px 20px;
  text-align: center;
  background: white;
  color: #64748b;
  border: 1px dashed #93c5fd;
  border-radius: 12px;
}

@media (max-width: 500px) {
  .cart-item {
    align-items: flex-start;
    gap: 12px;
  }

  .cart-item img {
    width: 85px;
    height: 85px;
  }
}
</style>
