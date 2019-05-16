import {GET_ERRORS,CLEAR_ERRORS, SET_ALERT, CLEAR_ALERT} from './types'
export const returnError=(msg,status,user=null)=>{
    return{
        type:GET_ERRORS,
        payload:{msg,status,user}
    }
}
export const clearError=()=>{
    return{
        type:CLEAR_ERRORS
    }
}
export const setAlert=(msg,type)=>{
    return {
        type:SET_ALERT,
        payload:{msg,type}
    }
}
export const clearAlert=()=>{
    return {
        type:CLEAR_ALERT
    }
}