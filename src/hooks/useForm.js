import { useState } from "react"

const useForm = (initialState = {}) => {

  const [valueForm, setValueForm] = useState(initialState)

  const onChange = ({target}) => {
    setValueForm({
      ...valueForm,
      [target.name]: target.value
    })
  }

  const reset = () => {
    setValueForm(initialState)
  }

  return {
    valueForm,
    setValueForm,
    onChange,
    reset
  }
}

export default useForm
