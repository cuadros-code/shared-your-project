import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
import { firebase, googleProvider } from '../../config/firebase'
import { authTypes } from "./authTypesReducer"
import alertError from "../../components/Alerts/AlertError"

export const AuthContext = createContext()

const AuthState = ({children}) => {

		const initialState = {
			user			: null,
			loading		: false,
			authError : false,
		}

    const [authState, dispatch] = useReducer(AuthReducer, initialState)

		// Register new user
		const registerNewUser = async ( {fullName, email, password} ) => {

			dispatch({ type: authTypes.InitAction })
			try {
				const newUser = await firebase
												.auth()
												.createUserWithEmailAndPassword( email, password )

				await newUser.user.updateProfile({
					displayName: fullName
				})				
				
				dispatch({ type: authTypes.RegisterUser, payload: newUser.user })
			} catch (error) {
				console.log(error)
				if(error.code === 'auth/email-already-in-use'){
					alertError({message: 'El correo ya se encuentra registrado.'})
				}
				dispatch({ type: authTypes.NewError })
			}
		}

		// Login with google
		const loginWithGoogle = async () => {

			dispatch({ type: authTypes.InitAction })
			try {
				const userLogin = await firebase
												  .auth()
													.signInWithPopup( googleProvider )

				dispatch({ type: authTypes.RegisterUser, payload: userLogin.user })
			} catch (error) {
				console.log(error)
				if(error.code === 'auth/account-exists-with-different-credential')
					alertError({message: 'El usuario ya se encuentra registrado.'})
				dispatch({ type: authTypes.NewError })
			}
		}

		// Login email and password
		const loginWithEmailAndPassword = async ({email, password}) => {

			dispatch({ type: authTypes.InitAction })
			try {
				const loginUser = await firebase
													.auth()
													.signInWithEmailAndPassword(email, password)
				
				dispatch({ type: authTypes.LoginUser, payload: loginUser.user })
			} catch (error) {
				console.log(error)
				if(error.code === 'auth/wrong-password')
					alertError({message: 'Usuario o contraseña incorrecta'})

				if(error.code === 'auth/user-not-found')
					alertError({message: 'El correo no se encuentra registrado.'})
				dispatch({ type: authTypes.NewError })
			}
		}
		
    return (
      <AuthContext.Provider
				value={{
					authState,
					registerNewUser,
					loginWithGoogle,
					loginWithEmailAndPassword
				}}
			>
          {children}
      </AuthContext.Provider>
    )
}

export default AuthState
