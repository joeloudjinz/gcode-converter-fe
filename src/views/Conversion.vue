<template>
  <div>
    <ErrorSection v-if="doShowErrorSection" :status="error.status" :message="error.message" />
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2 px-3 mb-6">
        <ParametersForm />
      </div>
      <div class="w-full lg:w-1/2 px-3 mb-6">
        <ImageForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ImageForm from "@/components/conversion/ImageForm.vue";
import ParametersForm from "@/components/conversion/ParametersForm.vue";
import ErrorSection from "@/components/conversion/ErrorSection.vue";
import { ErrorResponse } from "@/classes/error-response";

import Axios from "axios";

@Component({
  components: {
    ImageForm,
    ParametersForm,
    ErrorSection
  }
})
export default class Converter extends Vue {
  private doShowErrorSection: boolean = false;
  private error: ErrorResponse = new ErrorResponse();
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
        this.doShowErrorSection = true;
        this.error.setData(error);
      });
  }
}
</script>
