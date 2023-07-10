<template>
  <h1>recipe page</h1>
  <form @submit.prevent="submitForm">
    <div>
      <label for="ingredients">Ihre Zutaten</label>
      <input id="ingredients" name="ingredients" type="text" v-model.trim="ingredients">
    </div>
    <div>
      <button>Generiere Rezept</button>
    </div>
  </form>
  <div class="text-center" v-if='isLoading'>
    <p>Bitte warten</p>
  </div>
  <div v-else>
    <RecipeCard :title="title" :preparation="preparation" :zutaten="zutaten"></RecipeCard>
  </div>

</template>
<script>
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import axios from "axios";

export default {
  components: {RecipeCard},
  data() {
    return {
      ingredients: "",
      zutaten: "",
      title: "",
      preparation: "",
      isLoading: false,
      text: "",
    }
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      const {Configuration, OpenAIApi} = require("openai");

      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Generate a recipe and a title for a dish based on the following ingredients '[" + this.ingredients + "]'. The recipe should be in German.\n\nThe completion should be structured as follows:\n\nSection 1: the first section icludes the title for the recipe it should be desriptive for the recipe because it will be used to generate a picture with dalle 2 model.\nSection 2: includes the exact ingredients needed for 1 person.\nSection 3: includes the preperation steps,\n\nTitel:\n\"",
        temperature: 1,
        max_tokens: 1372,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      this.isLoading = false;

      const text = response.data.choices[0].text;
      this.text = text;

      const regexTitle = /^.+"/;
      const matchTitle = text.match(regexTitle);
      this.title = matchTitle ? matchTitle[0].replace(/\[ "|\\"" ]/, "").replace(/"$/, "") : null;

      const regexZutaten = /(Zutaten[\s\S]*Zubereitung:)/;
      const matchZutaten = text.match(regexZutaten);
      this.zutaten = matchZutaten ? matchZutaten[1].replace(/\n/g, " ").replace(/Zubereitung:/, "") : null;

      const regexPrep = /(Zubereitung[\s\S]*)/;
      const matchPrep = text.match(regexPrep);
      this.preparation = matchPrep ? matchPrep[1].replace(/\n/g, " ") : null;

      await axios.post("https://backend.ddev.site/api/save", {
        "title": this.title,
        "ingredients": this.zutaten,
        "preparation": this.preparation

      })  .then(function (response) {
        console.log(response);
      })
          .catch(function (error) {
            console.log(error);
          });

    }
  }
}

</script>
<style scoped>

</style>