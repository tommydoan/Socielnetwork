import axios from 'axios';
import {GETALL_POST, GET_ERRORS, ADD_POST, CLEAR_ALERT, DELETE_POST, GET_LIKES, GET1POST, ADD_COMMENT, DELETE_COMMENT} from './types';
import {returnError, setAlert} from './errorAction'
import {tokenconfig} from './authAction'
export const getAllPost=()=>async dispatch=>{
    try {
        const res= await axios.get('/api/posts/allposts');
        dispatch({
            type:GETALL_POST,
            payload:res.data
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
// POST A POST 
export const postApost=(post)=>async (dispatch, getState)=>{
    try {
        const res= await axios.post('/api/posts',post,tokenconfig(getState))
        dispatch({
            type:ADD_POST,
            payload:res.data
    })
        dispatch(setAlert('Post Successed ! '));
        setTimeout(()=>dispatch({type:CLEAR_ALERT}),5000);
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
// delete post 
export const deletePost=(id)=>async (dispatch, getState)=>{
    try {
        await axios.delete(`/api/posts/${id}`,tokenconfig(getState));
        dispatch({
            type:DELETE_POST,
            payload:id
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
// get Likes
export const getLikes=(id, userId)=>async (dispatch)=>{
    try {
       const res= await axios.post(`/api/posts/likes/${id}/${userId}`);
        dispatch({
            type:GET_LIKES,
            payload:{id, likes:res.data}
    })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
export const clearLike=(id)=>async (dispatch, getState)=>{
    try {
        const res=await axios.delete(`/api/posts/unlikes/${id}`, tokenconfig(getState));
        dispatch({
            type:GET_LIKES,
            payload:{id, likes:res.data}
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}

//Get 1 post 
export const getIndividualPost=(id)=>async dispatch=>{
try {
    const res= await axios.get(`/api/posts/me/${id}`);
    dispatch({
        type:GET1POST,
        payload:res.data
    })
} catch (error) {
    dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
}    
}
// get comment
export const addComment=(id, comment)=>async (dispatch, getState)=>{
    try {
        const res=await axios.post(`/api/posts/comments/${id}`, comment, tokenconfig(getState));
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert("Comment Created "));
        setTimeout(()=>dispatch({type:CLEAR_ALERT}),5000);
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}
//delete post
export const deleteComment=(idPost, idComment)=>async (dispatch, getState)=>{
    try {
        await axios.delete(`/api/posts/comments/${idPost}/${idComment}`, tokenconfig(getState));
        dispatch({
            type:DELETE_COMMENT,
            payload:idComment
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status));
        dispatch({
            type:GET_ERRORS
        })
    }
}