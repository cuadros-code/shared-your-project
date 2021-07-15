import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
import { firebase } from '../../config/firebase'
import { authTypes } from "./authTypesReducer"

const Context = createContext()

const AuthContext = ({children}) => {

		const initialState = {
			user			: null,
			loading		: false,
			authError : false,
		}

    const [authState, dispatch] = useReducer(AuthReducer, initialState)

		const registerNewUser = async ( email, password ) => {
			try {
				const newUser = await firebase
															.auth()
															.createUserWithEmailAndPassword( email, password )
				console.log(newUser)
			} catch (error) {
				dispatch( { type: authTypes.NewError } )
			}

		}

    return (
      <Context.Provider
				value={{
					authState,
					registerNewUser,
				}}
			>
          {children}
      </Context.Provider>
    )
}

export default AuthContext
