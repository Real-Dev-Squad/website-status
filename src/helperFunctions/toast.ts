// toast is imported as toastify to avoid declaration conflicts with local toast function

import { toast as toastify } from 'react-toastify';

const DELAY: number = 3000;
enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

const toast = (type: ToastTypes, message: string) => toastify[type](message, {
  position: toastify.POSITION.TOP_RIGHT,
  autoClose: DELAY,
  pauseOnHover: false,
  draggable: false,
});

export { toast, ToastTypes };
