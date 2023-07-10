<template>
  <div>
    <div v-if="recipeData.length > 0">
      <div v-for="recipe in recipeData" :key="recipe.id">
        <RecipeCard :title="recipe.title" :zutaten="recipe.ingredients" :preparation="recipe.preparation"></RecipeCard>
      </div>
    </div>
    <p v-else>No recipes found.</p>
  </div>
</template>

<script>
import axios from "axios";
import RecipeCard from "@/components/recipe/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipeData: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.defaults.baseURL = 'http://localhost:8080/';
      axios.get("api/show")
          .then((response) => {
            this.recipeData = response.data.reverse();
          })
          .catch((error) => {
            console.error('Error loading table data:', error);
          });
    },
  },
};
</script>

<style scoped>

</style>
