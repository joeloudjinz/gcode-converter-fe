<template>
  <div>
    <form @submit="passDataToParent">
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