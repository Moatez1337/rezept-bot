<template>
  <div class="card">
    <h1 class="card-title">{{ title }}</h1>
    <p class="card-content">{{ zutaten }}</p>
    <p class="card-content">{{ preparation }}</p>
  </div>
</template>

<script>
export default {
  props: {
    zutaten: String,
    title: String,
    preparation: String,
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-content {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
