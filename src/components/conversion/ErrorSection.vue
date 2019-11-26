<template>
  <div>
    <div class="bg-red-100 border-l-8 border-red-500 text-red-700 p-4 my-3" role="alert">
      <p class="font-bold">{{ status }}</p>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class ErrorSection extends Vue {
  @Prop() private message: any;
  @Prop() private status: any;
}
</script>

<style>
</style>