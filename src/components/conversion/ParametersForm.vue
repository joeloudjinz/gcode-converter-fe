<template>
  <form @submit="passDataToParent" class="w-full bg-white rounded shadow-md p-5">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="toolDiameter">Tool Diameter</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          id="toolDiameter"
          type="number"
          v-model="parameters.toolDiameter"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="sensitivity">Sensitivity</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.sensitivity"
          min="0"
          max="1"
          step="0.01"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="scaleAxes">Scale Axes</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.scaleAxes"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="deepStep">Deep Step</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.deepStep"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="whiteZ">White Z</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.whiteZ"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="blackZ">Black Z</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.blackZ"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="safeZ">Safe Z</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.safeZ"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3">
      <div class="w-full max-w-sm rounded overflow-hidden">
        <div class="font-bold text-xl">Feed Rate</div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="work">Work</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.work"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="idle">Idle</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="number"
          v-model="parameters.idle"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3"></div>
      <label class="md:w-2/3 block text-black-500 font-bold">
        <input class="mr-2 leading-tight" type="checkbox" v-model="parameters.laserMode" />
        <span class="text-md">Use laser mode</span>
      </label>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6" v-if="parameters.laserMode">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="safeZ">Command Power On</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="text"
          v-model="parameters.powerOn"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="j-base-label" for="safeZ">Command Power Off</label>
        <input
          class="j-base-input focus:outline-none focus:bg-white"
          type="text"
          v-model="parameters.powerOff"
        />
      </div>
    </div>
    <input
      class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ConversionParameters } from "@/classes/parameters";
import { Image } from "@/classes/image";

@Component
export default class ParametersForm extends Vue {
  // this is just a work around to avoid error of $parent not being an
  // instance of the exported class from the parent component
  private parent: any = this.$parent;
  private parameters: ConversionParameters = new ConversionParameters();

  public passDataToParent(event: Event) {
    event.preventDefault();
    let fd = this.parameters.append(new FormData());
    this.parent.submit(fd);
  }
}
</script>

<style>
</style>