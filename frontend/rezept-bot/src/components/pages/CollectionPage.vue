<template>
  <h1>collection page</h1>

<p>{{recipeData}}</p>
</template>
<script >
import axios from "axios";

export default {
  data(){
    return{
      recipeData : "",
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData(){
      axios.get("https://backend.ddev.site/api/show", {
          })
          .then((response) => {
            this.recipeData = response.data;

          })
          .catch((error) => {
            console.error('Error loading table data:', error);
          });
    }
  }

}
</script>
<style scoped>

</style>