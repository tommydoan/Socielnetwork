import {USER_LOADED,USER_LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERRORS, LOGIN_FAIL, REGISTER_FAIL, LOGOUT_SUCCESS, DELETE_ALL} from '../action/types'
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    user:null,
    isLoading:false
}

export default function authReducer(state=initialState, action) {
  switch(action.type){
      case USER_LOADING:
      return{
          ...state,
          isLoading:true
      }
      case USER_LOADED:
      return{
          ...state,
          isAuthenticated:true,
          user:action.payload,
          isLoading:false
      }
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
          ...state,
          ...action.payload,
          isAuthenticated:true,
          isLoading:false
      }
      case AUTH_ERRORS:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT_SUCCESS:
      case DELETE_ALL:
      localStorage.removeItem('token');
      return{
          ...state,
          token:null,
          user:null,
          isAuthenticated:false,
          isLoading:true
      }
      default:
      return state;
  }
}
