<script setup>
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="app">
    <header class="navbar">
      <h1>Toko Online</h1>

      <nav>
        <RouterLink to="/">Katalog</RouterLink>

        <RouterLink to="/cart">
          Keranjang ({{ cartStore.jumlahItem }})
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.navbar {
  text-align: center;
  padding: 25px 20px;
  color: white;
  background: linear-gradient(120deg, #2563eb, #7c3aed);
  box-shadow: 0 3px 12px rgba(79, 70, 229, 0.2);
}

.navbar h1 {
  margin-bottom: 18px;
  font-size: 28px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 30px;
}

nav a {
  text-decoration: none;
  color: #ddd6fe;
  font-weight: 600;
  transition: 0.2s;
}

nav a:hover,
nav a.router-link-active {
  color: white;
}

main {
  max-width: 1100px;
  margin: auto;
  padding: 30px 20px;
}

@media (max-width: 480px) {
  nav {
    gap: 20px;
  }
}

</style>
