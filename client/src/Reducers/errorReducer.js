import { GET_ERRORS, CLEAR_ERRORS, SET_ALERT, CLEAR_ALERT} from '../action/types'
const initialState={
    msg:{},
    status:null,
    user:null,
    alert:null
}

export default function errorReducer(state=initialState, action) {
  switch(action.type){
      case GET_ERRORS:
      return{
          msg:action.payload.msg,
          status:action.payload.status,
          user:action.payload.user
      }
      case CLEAR_ERRORS:
      return{
          msg:{},
          status:null,
          user:null
      }
      case SET_ALERT:
      return{
          alert:action.payload.msg
      }
      case CLEAR_ALERT:
      return{
          alert:null
      }
      default:
      return state;
  }
}
