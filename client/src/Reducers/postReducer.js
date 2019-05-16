import {GETALL_POST, ADD_POST, DELETE_POST, GET_LIKES, GET1POST, ADD_COMMENT, DELETE_COMMENT} from '../action/types';
const initialState={
    posts:[],
    post:[],
    loading:false,
    error:{}
}

export default function postReducer(state=initialState, action) {
  switch(action.type){
      case GETALL_POST:
      return {
          ...state,
          posts:action.payload,
          loading:true
      }
      case GET1POST:
      return {
          ...state,
          post:action.payload,
          loading:true
      }
      case ADD_POST:
      return {
          ...state,
          posts:[...state.posts, action.payload],
          loading:true
      }
      case DELETE_POST:
      return{
          ...state,
          posts:state.posts.filter(post=>post._id!==action.payload),
          loading:true
          
      }
      case GET_LIKES:
      return {
          ...state,
          posts:state.posts.map(post=>post._id===action.payload.id?{
              ...post, likes:action.payload.likes
          }:post),
          loading:true
      }
      case ADD_COMMENT:
      return {
          ...state,
          post:{...state.post, comments:action.payload},
          loading:true
      }
      case DELETE_COMMENT:
      return{
          ...state,
          post:{...state.post, comments:state.post.comments.filter(comment=>(
              comment._id!==action.payload
          ))}
      }
      default:
      return state;
  }
}
