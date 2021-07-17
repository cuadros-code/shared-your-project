import { authTypes } from "./authTypesReducer";

const AuthReducer = ( state, action ) => {
  
  //user			: null,
	//loading		: false,
	//authError : false,

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
        loading: false
      }

    case authTypes.NewError:
      return{
        ...state,
        authError: action.payload,
        loading  : false
      }

    default:
        return state
  }
}

export default AuthReducer