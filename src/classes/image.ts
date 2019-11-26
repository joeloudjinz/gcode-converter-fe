export class Image {
  private image: any = null;
  private url: string = "";

  public setImageView(input: any) {
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      this.url = URL.createObjectURL(this.image);
    }
  }
  public shouldDisplay() {
    return this.url !== undefined && this.url !== null && this.url !== "";
  }
  public append(formData: FormData): FormData {
    if (this.image) {
      formData.append("image", this.image, this.image.name);
    }
    return formData;
  }
}
