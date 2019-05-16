import {USER_LOADING, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL,
     REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, LOGOUT_SUCCESS, CLEAR_PROFILE} from './types'
import axios from 'axios';
import { returnError } from './errorAction';

export const loadUser=()=>async (dispatch, getState)=>{ 
    const res =await axios.get('/api/auth',tokenconfig(getState));
    dispatch({
        type:USER_LOADED,
        payload:res.data
    });
    dispatch({
        type:USER_LOADING
    })
    
}
export const tokenconfig=(getState)=>{
    const config={
        headers:{
            "Content-type":"application/json"
        }
    }
    const token=getState().auth.token;
    if(token)
    config.headers['x-auth-token']=token;
    return config;
    
}

export const register=(newUser)=>dispatch=>{
    axios.post('/api/users',newUser)
    .then(res=>dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnError(err.response.data,err.response.status,'REGISTER_FAIL'));
        setTimeout(()=>dispatch({
            type:REGISTER_FAIL
        }),5000)
    })
}

// login
export const login=(User)=>dispatch=>{
    axios.post('/api/auth',User)
    .then(res=>dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnError(err.response.data,err.response.status,'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        })
        setTimeout(()=>dispatch({
            type:CLEAR_ERRORS
        }),5000)
    })
}
// logout 
export const logout=()=>dispatch=>{
   dispatch({type:LOGOUT_SUCCESS,
    });
    dispatch({type:CLEAR_PROFILE});
}