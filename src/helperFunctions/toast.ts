import { toast } from 'react-toastify';

const DELAY: number = 3000;
enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

type ToastType = ToastTypes ;

const Toast = (type: ToastType, message: string) => toast[type](message, {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: DELAY,
  pauseOnHover: false,
  draggable: false,
});

export default Toast;
export { ToastTypes };
