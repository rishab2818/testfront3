import { toast } from "sonner";

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast.message(message);
};

export const showWarningToast = (message) => {
  toast.warning(message);
};
