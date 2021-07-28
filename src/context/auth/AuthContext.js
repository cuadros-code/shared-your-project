import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
import { authTypes } from "./authTypesReducer"
import alertError from "../../components/Alerts/AlertError"
import { collection } from "../../constants/collectionsFirebase"
import { firebase, firestore, googleProvider, storage } from '../../config/firebase'
import alertSuccess from "../../components/Alerts/AlertSuccess"

export const AuthContext = createContext()

const AuthState = ({children}) => {

		const initialState = {
			user			: null,
			loading		: false,
			authError : false,
			isAuth    : false,
		}

    const [authState, dispatch] = useReducer(AuthReducer, initialState)

		// Register new user
		const registerNewUser = async ( {fullName, email: userEmail, password} ) => {
			dispatch({ type: authTypes.InitAction })
			try {
				const newUser = await firebase
												.auth()
												.createUserWithEmailAndPassword( userEmail, password )

				await newUser.user.updateProfile({
					displayName: fullName
				})

				const { displayName, email, photoURL, uid } = newUser.user
				await firestore
							.collection(collection.users)
							.doc(newUser.user.uid)
							.set({
								displayName,
								email,
								photoURL,
							})
				
				const dataUser = await userById({uidUser: uid})		
				dispatch({ 
					type: authTypes.RegisterUser, 
					payload: dataUser 
				})

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
				const userLogin = await 
													firebase
												  .auth()
													.signInWithPopup( googleProvider )

				const { displayName, email, photoURL, uid } = userLogin.user
				if(await existsUser({uidUser: uid}) === false){
				 await firestore
						.collection(collection.users)
						.doc(userLogin.user.uid)
						.set({
							displayName,
							email,
							photoURL,
							uid
						})
				}

				const dataUser = await userById({uidUser: uid})
				dispatch({ 
					type   : authTypes.RegisterUser, 
					payload: dataUser
				})

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
				const loginUser = await 
													firebase
													.auth()
													.signInWithEmailAndPassword(email, password)

				const { uid } =  loginUser.user
				const dataUser = await userById({uidUser: uid})
				dispatch({ 
					type   : authTypes.LoginUser, 
					payload: dataUser
				})

			} catch (error) {
				console.log(error)
				if(error.code === 'auth/wrong-password')
					alertError({message: 'Usuario o contraseña incorrecta'})

				if(error.code === 'auth/user-not-found')
					alertError({message: 'El correo no se encuentra registrado.'})
				dispatch({ type: authTypes.NewError })
			}
		}

		// update profile data user
		const updateDataProfile = async ({ uid, dataProfile }) => {

			dispatch({ type: authTypes.InitAction })
			try {
			  await firestore
							.collection(collection.users)
							.doc(uid)
							.update({
								...dataProfile
							})

				const dataUser = await userById({uidUser: uid})
				dispatch({ 
					type   : authTypes.LoginUser, 
					payload: dataUser
				})
				alertSuccess({message: 'Perfil 👍'})
			} catch (error) {
				alertError({message: 'Error al actualizar perfil'})
			}
		}

		// Get data user by UID
		const userById = async ( { uidUser } ) => {
			try {
				const userData = await firestore
																.collection(collection.users)
																.doc(uidUser)
																.get()
				return {
					...userData.data(),
					uid: userData.id 
				}
			} catch (error) {
				alertError({message: 'Error al autenticar usuario'})
				dispatch({ type: authTypes.NewError })
			}
		}

		// Update image profile
		const updateAvatar = async ({ image, uid }) => {
			try {
				const newRef = storage
											.ref('images')
											.child(image.name)
				await newRef.put(image)

				const urlImage = await newRef.getDownloadURL()
				updateDataProfile({ 
					uid, 
					dataProfile : { photoURL: urlImage }
				})

			} catch (error) {
				alertError({message: 'Error al subir la imagen'})
				dispatch({ type: authTypes.NewError })
			}
		}

		// On refresh page
		const getCurrentUser = ( ) => {
			try {
				firebase.auth().onAuthStateChanged( async (user) => {
					if(user){
						const { uid } = user
						const dataUser = await userById({uidUser: uid})
						dispatch({ 
							type   : authTypes.LoginUser, 
							payload: dataUser
						})
					}else{
						dispatch({ type: authTypes.LogoutUser })	
					}
				})
			} catch (error) {
				alertError({message: 'Error en autenticar usuario'})
			}
		}
		
		// Verify if user is register
		const existsUser = async ({uidUser}) => {
			try {
				const userData = await firestore
																.collection(collection.users)
																.doc(uidUser)
																.get()
				return userData.exists
			} catch (error) {
				alertError({message: 'Error al obtener información'})
			}
		}

		// Logout user
		const logoutUser = async () => {
			try {
				await firebase.auth().signOut()
				dispatch({ type: authTypes.LogoutUser })
			} catch (error) {
				alertError({message: 'Error al cerrar sesión'})
			}
		}

		
		
    return (
      <AuthContext.Provider
				value={{
					authState,
					logoutUser,
					updateAvatar,
					getCurrentUser,
					registerNewUser,
					loginWithGoogle,
					updateDataProfile,
					loginWithEmailAndPassword,
				}}
			>
          {children}
      </AuthContext.Provider>
    )
}

export default AuthState
