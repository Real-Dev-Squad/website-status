import { toast } from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error' ;

const Toast = (type: ToastType, message: string) => toast[type](message, {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  pauseOnHover: false,
  draggable: false,
});

export default Toast;
