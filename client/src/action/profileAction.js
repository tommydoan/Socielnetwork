import {GET_PROFILE, GET_ERRORS_PROFILE, GET_ERRORS, GETALL_PROFILE, DELETE_ALL} from './types';
import {returnError,setAlert, clearAlert} from './errorAction';
import {tokenconfig} from './authAction'
import axios from 'axios';
export const getCurrentProfiles=()=>(dispatch,getState)=>{
    axios.get('/api/profiles/me',tokenconfig(getState))
    .then(res=>dispatch({
        type:GET_PROFILE,
        payload:res.data
    }))
    .catch(error=>{
        dispatch(returnError(error.response.data,error.response.status));
        dispatch({
            type:GET_ERRORS_PROFILE,
        })
    })

}
//create or edit profile
export const createOrEditProfile=(newUser, edit=true)=>async (dispatch, getState)=>{
    try {
        const res= await axios.post('/api/profiles',newUser,tokenconfig(getState));
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit?'Profile Edited':'Profile Created'))
        setTimeout(()=>dispatch(clearAlert()),5000);
    } catch (error) {
        dispatch(returnError(error.response.data,error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
export const experience=(newExp)=>async (dispatch, getState)=>{
    try {
        const res=await axios.put('/api/profiles/experience',newExp,tokenconfig(getState));
        dispatch({
            type:GET_PROFILE,
            payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }

}
export const deleteExperience=(id)=>async (dispatch, getState)=>{
    try {
        const res= await axios.delete(`/api/profiles/experience/${id}`,tokenconfig(getState))
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
// Add education
export const addEducation=(newEdu)=>async (dispatch, getState)=>{
    try {
        const res= await axios.put('/api/profiles/addeducation',newEdu,tokenconfig(getState));
        dispatch({
            type:GET_PROFILE,
            payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
//Delete education
export const deleteEducation=(id)=>async (dispatch, getState)=>{
    try {
        const res=await axios.delete(`/api/profiles/education/${id}`,tokenconfig(getState));
        dispatch({
            type:GET_PROFILE,
            payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }

}
// Get profile by user_id
export const getProfilebyId=(id)=>async dispatch=>{
    try {
        const res= await axios.get(`/api/profiles/${id}`);
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
// Get All profiles 
export const getAllProfiles=()=> async dispatch=>{
    try {
        const res= await axios.get('/api/profiles');
    dispatch({
        type:GETALL_PROFILE,
        payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
//Delete Profiles and User 
export const deleteProAndUser=()=>async (dispatch,getState)=>{
    try {
        await axios.delete('/api/profiles/user&profile',tokenconfig(getState));
        dispatch({
            type:DELETE_ALL,
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}