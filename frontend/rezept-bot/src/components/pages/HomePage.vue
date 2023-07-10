<template>
  <div class="home">

    <h1 class="description">Willkommen zum Rezept-Bot!</h1>
    <p class="description">
      Mein Rezept-Bot generiert ein Rezept basierend auf
      eingegebenen Zutaten. Das Rezept wird in der Sammlungsseite gespeichert.
    </p>
    <button @click="goToGeneratePage">Rezept generieren</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToGeneratePage() {
      this.$router.push('/generate');
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin: 20px;
}

.description {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
