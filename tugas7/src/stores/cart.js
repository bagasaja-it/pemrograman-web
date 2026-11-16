import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Menyimpan daftar produk di keranjang
  const items = ref([])

  // Menambahkan produk ke keranjang
  function tambahKeKeranjang(produk) {
    items.value.push(produk)
  }

  // Menghitung jumlah produk di keranjang
  const jumlahItem = computed(() => items.value.length)

  return {
    items,
    tambahKeKeranjang,
    jumlahItem
  }
})
