<template>
  <div class="navbar">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/generate">Generiere Rezept</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/collection">Sammlung</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // Component logic goes here
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-list {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 10px;
}

.nav-item a {
  color: #fff;
  text-decoration: none;
  padding: 5px;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>
