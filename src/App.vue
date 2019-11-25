<template>
  <div id="app" class="container mx-auto bg-red-500 p-10">
    <Converter msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Converter from "./components/Converter.vue";

@Component({
  components: {
    Converter
  }
})
export default class App extends Vue {}
</script>
