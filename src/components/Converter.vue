<template>
  <div>
    <p>{{ msg }}</p>
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
        <input id="toolDiameter" type="number" v-model="toolDiameter" />
      </div>
      <div>
        <label for="sensitivity">Sensitivity</label>
        <input type="number" v-model="sensitivity" min="0" max="1" step="0.01" />
      </div>
      <div>
        <label for="scaleAxes">Scale Axes</label>
        <input type="number" v-model="scaleAxes" />
      </div>
      <div>
        <label for="deepStep">Deep Step</label>
        <input type="number" v-model="deepStep" />
      </div>
      <div>
        <label for="whiteZ">White Z</label>
        <input type="number" v-model="whiteZ" />
      </div>
      <div>
        <label for="blackZ">Black Z</label>
        <input type="number" v-model="blackZ" />
      </div>
      <div>
        <label for="safeZ">Safe Z</label>
        <input type="number" v-model="safeZ" />
      </div>
      <div>
        Feed rate
        <div>
          <label for="work">Work</label>
          <input type="number" v-model="work" />
        </div>
        <div>
          <label for="idle">Idle</label>
          <input type="number" v-model="idle" />
        </div>
      </div>
      <div>
        Laser mode
        <input type="checkbox" v-model="laserMode" />
      </div>
      <div v-if="laserMode">
        <div>
          <label for="safeZ">Command Power On</label>
          <input type="text" v-model="powerOn" />
        </div>
        <div>
          <label for="safeZ">Command Power Off</label>
          <input type="text" v-model="powerOff" />
        </div>
      </div>
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component
export default class Converter extends Vue {
  @Prop() private msg!: string;
  private image: any = null;
  private imageURL: string = "";
  private toolDiameter: number = 1;
  private sensitivity: number = 0.95;
  private scaleAxes: number = 150;
  private deepStep: number = -1;
  private whiteZ: number = 0;
  private blackZ: number = -2;
  private safeZ: number = 2;
  private work: number = 3000;
  private idle: number = 1200;
  private laserMode: boolean = false;
  private powerOn: string = "M04";
  private powerOff: string = "M05";

  public imageInputChanged(event: Event) {
    var input: any = event.target;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      this.imageURL = URL.createObjectURL(this.image);
      console.log(this.imageURL);
    }
  }

  public async submit(event: Event) {
    event.preventDefault();
    const data = this.constructParametersObject();
    const formData = this.constructFormDataObject(data);
    Axios.post("http://localhost:3000/convert", formData)
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

  private constructFormDataObject(data: any) {
    const fd = new FormData();
    fd.append("parameters", JSON.stringify(data));
    fd.append("image", this.image, this.image.name);
    return fd;
  }

  private constructParametersObject(): any {
    return {
      toolDiameter: this.toolDiameter,
      sensitivity: this.sensitivity,
      scaleAxes: this.scaleAxes,
      deepStep: this.deepStep,
      whiteZ: this.whiteZ,
      blackZ: this.blackZ,
      safeZ: this.safeZ,
      feedRate: {
        work: this.work,
        idle: this.idle
      },
      laserMode: this.laserMode,
      laser: this.laserMode
        ? {
            commandPowerOn: this.powerOn,
            commandPowerOff: this.powerOff
          }
        : null
    };
  }
}
</script>
