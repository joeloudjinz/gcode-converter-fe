export interface ErrorMessage {
  value: any;
  property: any;
  constraints: any;
}

export class ErrorResponse {
  public message?: ErrorMessage | string;
  public status: string = "No Status";

  public setData(error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.message = error.response.data.message;
      this.status = error.response.data.error;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this.status = "No Response";
      this.message = "Server did not provide any response";
    } else {
      // Something happened in setting up the request that triggered an Error
      this.status = "Error in Request";
      this.message = error.message;
    }
  }
}
