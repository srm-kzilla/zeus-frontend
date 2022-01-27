<template>
  <div class="nav">
    <h1 class="logo-text">Zeus</h1>
    <div class="links">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/create">Create</router-link>
    </div>
    <div><img src="/Kzilla Logo.png" alt="Logo" /></div>
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

a {
  padding: 0.5rem 2rem;
  display: inline-block;
  transition: all 100ms ease-in-out;
  color: var(--bg-color);
  text-decoration: none;
  background-color: var(--accent-color);
  border-radius: 1rem;
  margin: 0 2rem;
  box-shadow: 4px 5px 15px -2px rgba(0, 0, 0, 0.13);
}

a:hover {
  scale: 1.06;
  box-shadow: 4px 5px 15px -2px rgba(0, 0, 0, 0.23);
}
</style>
