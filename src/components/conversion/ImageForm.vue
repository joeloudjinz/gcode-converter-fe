<template>
  <div>
    <div class="file-upload-form">
      Upload an image file:
      <input type="file" @change="imageInputChanged" accept="image/*" />
    </div>
    <div class="image-preview" v-if="image.shouldDisplay">
      <img :src="image.url" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Image } from "@/classes/image";

@Component
export default class ImageForm extends Vue {
  private image: Image = new Image();

  private imageInputChanged(event: Event) {
    this.image.setImageView(event.target);
  }
}
</script>

<style>
</style>