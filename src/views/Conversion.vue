<template>
  <div>
    <ImageForm />
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
import { ConversionParameters } from "@/classes/parameters";
import ImageForm from "@/components/conversion/ImageForm.vue";

import Axios from "axios";

@Component({
  components: {
    ImageForm
  }
})
export default class Converter extends Vue {
  private parameters: ConversionParameters = new ConversionParameters();

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
    let fd = this.parameters.append(new FormData());
    // fd = this.image.append(fd);
    return fd;
  }
}
</script>
