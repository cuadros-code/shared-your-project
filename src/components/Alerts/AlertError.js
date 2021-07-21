import { toast } from 'react-toastify'

const alertError = ({message}) => 
  toast.error(message, 
    {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
)


export default alertError