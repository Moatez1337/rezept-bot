<template>
  <div class="card success-card">
    <p class="card-content">Rezept gespeichert. Vielen Dank!</p>
    <button class="success-button" @click="goToCollection">Sammlungsseite</button>
    <button class="success-button" @click="emitReload">Neu Generieren</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToCollection() {
      this.$router.push('/collection');
    },
    emitReload() {
      this.$emit('reload');
    },
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #4CAF50;
  background-color: #F1F8E9;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}
.card-content {
  font-size: 16px;
  margin-bottom: 10px;
}
.success-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
