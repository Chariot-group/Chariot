import * as Toastr from "toastr"; 

Toastr.options.positionClass = "toast-top-right";
Toastr.options.timeOut = 5000;

export const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
  switch (type) {
    case "success":
      Toastr.success(message);
      break;
    case "error":
      Toastr.error(message);
      break;
    case "info":
      Toastr.info(message);
      break;
    case "warning":
      Toastr.warning(message);
      break;
    default:
      Toastr.info(message);
      break;
  }
};
