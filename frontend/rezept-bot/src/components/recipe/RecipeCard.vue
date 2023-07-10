<template>
  <div>
    <h1>{{title}}</h1>
    <p> {{zutaten}} </p>
    <p> {{preparation}}</p>
  </div>
</template>
<script >

export default {
  data(){
    return {

    }
  },
  props: {
    zutaten : String,
    title :  String,
    preparation :  String,

  }
}
</script>
<style scoped>

</style>