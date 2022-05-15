<template>
  <div class="nav">
    <router-link class="link" to="/">
      <h1>Zeus</h1>
    </router-link>

    <div><img src="../../assets/Kzilla Logo.png" alt="Logo" /></div>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 1.5rem;
}

.logo-text,
img {
  cursor: pointer;
}
</style>
