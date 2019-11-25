export class ConversionParameters {
  public toolDiameter: number = 1;
  public sensitivity: number = 0.95;
  public scaleAxes: number = 150;
  public deepStep: number = -1;
  public whiteZ: number = 0;
  public blackZ: number = -2;
  public safeZ: number = 2;
  public work: number = 3000;
  public idle: number = 1200;
  public laserMode: boolean = false;
  public powerOn: string = "M04";
  public powerOff: string = "M05";

  public append(formData: FormData): FormData {
    formData.append("toolDiameter", this.toolDiameter.toString());
    formData.append("sensitivity", this.sensitivity.toString());
    formData.append("scaleAxes", this.scaleAxes.toString());
    formData.append("deepStep", this.deepStep.toString());
    formData.append("whiteZ", this.whiteZ.toString());
    formData.append("blackZ", this.blackZ.toString());
    formData.append("safeZ", this.safeZ.toString());
    formData.append("workFeedRate", this.work.toString());
    formData.append("idleFeedRate", this.idle.toString());
    formData.append("laserMode", this.laserMode.toString());
    if (this.laserMode) {
      formData.append("laserPowerOn", this.powerOn.toString());
      formData.append("laserPowerOff", this.powerOff.toString());
    }

    return formData;
  }
}
