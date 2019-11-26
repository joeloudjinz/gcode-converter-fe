<template>
  <div>
    <ImageForm />
    <ParametersForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConversionParameters } from "@/classes/parameters";
import ImageForm from "@/components/conversion/ImageForm.vue";
import ParametersForm from "@/components/conversion/ParametersForm.vue";

import Axios from "axios";

@Component({
  components: {
    ImageForm,
    ParametersForm
  }
})
export default class Converter extends Vue {
  public async submit(formData: FormData) {
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
}
</script>
