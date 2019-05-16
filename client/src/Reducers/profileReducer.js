import {GET_PROFILE,CLEAR_PROFILE, GET_ERRORS_PROFILE, ADDOREDIT_PROFILE, LOADING, GETALL_PROFILE} from '../action/types'
const initialState={
    profile:null,
    profiles:[],
    loading:false,
    error:{}
}

export default function profileReducer(state=initialState, action) {
     switch(action.type){
         case GET_PROFILE:
         return{
             ...state,
             profiles:action.payload,
             loading:true,
             
         }
         case GETALL_PROFILE:
         return {
             ...state,
             profile:action.payload,
             loading:true
         }
         case LOADING:
         return{
             loading:true
         }
         case GET_ERRORS_PROFILE:
         return {
             ...state,
             error:action.payload,
             loading:false 
         }
         case CLEAR_PROFILE:
         return {
             ...state,
             profiles:[],
             loading:false,
             error:{}
         }
         case ADDOREDIT_PROFILE:
         return {
             ...state,
             profiles:[action.payload,...state.profiles]
         }
         default :
         return state;
     }
}
