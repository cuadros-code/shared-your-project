import { authTypes } from "./authTypesReducer";

const AuthReducer = ( state, action ) => {
  
  //user			: null,
	//loading		: false,
	//authError : false,
  //isAuth    : false,

  switch (action.type) {
    case authTypes.InitAction:
      return{
        ...state,
        loading: true
      }

    case authTypes.RegisterUser:
      return{
        ...state,
        user   : action.payload,
        isAuth : true,
        loading: false
      }
    case authTypes.LoginUser:
      return{
        ...state,
        user   : action.payload,
        isAuth : true,
        loading: false
      }
    case authTypes.NewError:
      return{
        ...state,
        loading  : false
      }
    
    case authTypes.LogoutUser:
      return{
        ...state,
        user      : null,
        isAuth    : false,
	      loading		: false,
	      authError : false,
      }

    default:
        return state
  }
}

export default AuthReducer