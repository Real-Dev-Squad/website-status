import { toast } from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error' ;
const toastContainer = (type: ToastType, message: string) => toast[type](message, {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
});
export default toastContainer;
