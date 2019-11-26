<template>
  <div id="app">
    <NavigationBar />
    <div class="container mx-auto bg-gray-200 p-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "@/components/app/Navigation.vue";

@Component({
  components: {
    NavigationBar
  }
})
export default class App extends Vue {}
</script>
