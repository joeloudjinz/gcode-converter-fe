<template>
  <div>
    <p>Hello</p>
    <div>
      <div class="file-upload-form">
        Upload an image file:
        <input type="file" @change="imageInputChanged" accept="image/*" />
      </div>
      <div class="image-preview" v-if="imageURL">
        <img :src="imageURL" />
      </div>
    </div>
    <form @submit="submit">
      <div>
        <label for="toolDiameter">Tool Diameter</label>
        <input id="toolDiameter" type="number" v-model="parameters.toolDiameter" />
      </div>
      <div>
        <label for="sensitivity">Sensitivity</label>
        <input type="number" v-model="parameters.sensitivity" min="0" max="1" step="0.01" />
      </div>
      <div>
        <label for="scaleAxes">Scale Axes</label>
        <input type="number" v-model="parameters.scaleAxes" />
      </div>
      <div>
        <label for="deepStep">Deep Step</label>
        <input type="number" v-model="parameters.deepStep" />
      </div>
      <div>
        <label for="whiteZ">White Z</label>
        <input type="number" v-model="parameters.whiteZ" />
      </div>
      <div>
        <label for="blackZ">Black Z</label>
        <input type="number" v-model="parameters.blackZ" />
      </div>
      <div>
        <label for="safeZ">Safe Z</label>
        <input type="number" v-model="parameters.safeZ" />
      </div>
      <div>
        Feed rate
        <div>
          <label for="work">Work</label>
          <input type="number" v-model="parameters.work" />
        </div>
        <div>
          <label for="idle">Idle</label>
          <input type="number" v-model="parameters.idle" />
        </div>
      </div>
      <div>
        Laser mode
        <input type="checkbox" v-model="parameters.laserMode" />
      </div>
      <div v-if="parameters.laserMode">
        <div>
          <label for="safeZ">Command Power On</label>
          <input type="text" v-model="parameters.powerOn" />
        </div>
        <div>
          <label for="safeZ">Command Power Off</label>
          <input type="text" v-model="parameters.powerOff" />
        </div>
      </div>
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConversionParameters } from "../classes/parameters";

import Axios from "axios";

@Component
export default class Converter extends Vue {
  private parameters: ConversionParameters = new ConversionParameters();
  private image: any = null;
  private imageURL: string = "";

  public imageInputChanged(event: Event) {
    const input: any = event.target;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      this.imageURL = URL.createObjectURL(this.image);
    }
  }

  public async submit(event: Event) {
    event.preventDefault();
    Axios.post("http://localhost:3000/convert", this.constructFormDataObject())
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        // console.log(error.config);
      });
  }

  private constructFormDataObject() {
    let fd = new FormData();
    fd = this.parameters.append(fd);
    fd.append("image", this.image, this.image.name);
    return fd;
  }
}
</script>
