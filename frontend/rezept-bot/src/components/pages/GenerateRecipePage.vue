<template>
  <RecipeOk v-if="isOk" @reload="reloadForm"></RecipeOk>
  <div v-else>
  <h1>Zutaten Eingeben</h1>
  <form @submit.prevent="submitForm" v-if="formEmpty">
    <div class="form-control" :class="{invalid: validity === 'invalid'}">
      <label for="ingredients"></label>
      <input id="ingredients" name="ingredients" type="text" v-model.trim="ingredients" @blur="validateInput">
      <p v-if="validity === 'invalid'">Bitte Zutaten eingeben!</p>
    </div>
    <div>
      <button :disabled="validity === 'invalid'">Generiere Rezept</button>
    </div>
  </form>
  <div v-else>
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
    </div>
    <div v-else>
      <RecipeCard :title="title" :preparation="preparation" :zutaten="zutaten"></RecipeCard>
      <button @click="saveRecipe">Rezept Speichern</button>
      <button @click="reloadForm">Neu Generieren</button>
    </div>
  </div>
  </div>
</template>
<script>
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import RecipeOk from "@/components/recipe/RecipeOk.vue";
import axios from "axios";

export default {
  components: {RecipeCard, RecipeOk},
  data() {
    return {
      ingredients: "",
      zutaten: "",
      title: "",
      preparation: "",
      isLoading: false,
      text: "",
      formEmpty: true,
      isOk: false,
      validity : 'pending',
    }
  },
  methods: {
    async submitForm() {
      if (this.validity === 'invalid' || this.ingredients === '') {
        this.validity = 'invalid'
        return;
      }
      this.isLoading = true;
      this.formEmpty = false;
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
      this.title = matchTitle ? matchTitle[0].replace(/\[ "|\\"" ]/, "").replace(/"$/, "").trim() : null;

      const regexZutaten = /(Zutaten[\s\S]*Zubereitung:)/;
      const matchZutaten = text.match(regexZutaten);
      this.zutaten = matchZutaten ? matchZutaten[1].replace(/\n/g, " ").replace(/Zubereitung:/, "").trim() : null;

      const regexPrep = /(Zubereitung[\s\S]*)/;
      const matchPrep = text.match(regexPrep);
      this.preparation = matchPrep ? matchPrep[1].replace(/\n/g, " ").trim() : null;

    },
    saveRecipe() {
      const dataSend = {
        title: this.title,
        ingredients: this.zutaten,
        preparation: this.preparation
      }
      console.log(dataSend)
      axios.defaults.baseURL = 'http://localhost:8080/';
      axios.post("api/save", dataSend).then(function (response) {
        console.log(response);
      })
          .catch(function (error) {
            console.log(error);
          });
      this.isOk = true;

    },
    reloadForm() {
      this.formEmpty = !this.formEmpty;
      this.ingredients = "";
      this.isOk = false;
    },
    validateInput(){
      if (this.ingredients === "") {
        this.validity = 'invalid';
      } else {
        this.validity = 'valid';
      }
    }
  }
}

</script>


<style scoped>
.form-control.invalid input{
  border-color: red;
}
.form-control.invalid label{
  color: red;
}
h1 {
  color: #333;
}

form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

.text-center {
  text-align: center;
}

p {
  font-size: 18px;
}
.loading-spinner {
  position: relative;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
