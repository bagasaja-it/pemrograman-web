
<script setup>
import ProductCard from '../components/ProductCard.vue'


const daftarProduk = [
  {
    id: 1,
    nama: 'Lamborghini Aventador',
    deskripsi: 'Supercar dengan desain agresif dan mesin V12.',
    harga: 8500000000,
    gambar: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500'
  },
  {
    id: 2,
    nama: 'Ferrari 488 GTB',
    deskripsi: 'Mobil sport Italia dengan performa tinggi.',
    harga: 7500000000,
    gambar: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=500'
  },
  {
    id: 3,
    nama: 'Porsche 911',
    deskripsi: 'Mobil sport ikonik dengan desain klasik.',
    harga: 4500000000,
    gambar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500'
  },
  {
    id: 4,
    nama: 'McLaren 720S',
    deskripsi: 'Supercar dengan desain aerodinamis.',
    harga: 9000000000,
    gambar: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=500'
  }
]

</script>

<template>
  <section class="home">
    <div class="product-list">
      <ProductCard
        v-for="produk in daftarProduk"
        :key="produk.id"
        :produk="produk"
      />
    </div>
  </section>
</template>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 25px;
}

@media (max-width: 480px) {
  .product-list {
    gap: 12px;
  }
}
</style>
