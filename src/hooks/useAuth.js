import { useState } from 'react'
import { firebase } from '../config/firebase'

const useAuth = () => {

  const [userAuth, setUserAuth] = useState(null)

  firebase.auth().onAuthStateChanged((user) => {
    if(user) setUserAuth(user)
    else setUserAuth(null)
  })

  return {
    userAuth
  }
}

export default useAuth
