import { toast } from 'react-toastify'

const alertSuccess = ({message}) => 
  toast.success(message, 
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
)

export default alertSuccess