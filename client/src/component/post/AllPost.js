import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {Alert} from 'reactstrap'
import {getAllPost, postApost, deletePost, getLikes, clearLike, getIndividualPost} from '../../action/postAction';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
class AllPost extends Component {
    state={
        text:"",
        check:true,
        like:false,
        checkComment:false
    }

    componentDidMount(){
        this.props.getAllPost();   
       
    }
    onClick123=(_id)=>{
      this.props.getIndividualPost(_id);
    }
    onChange=e=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=e=>{
        e.preventDefault();
        const {text}=this.state;
        const newPost={
            text
        }
        this.props.postApost(newPost);     
        this.props.history.push('/allposts');
        this.setState({text:""})
        this.setState({check:false});
    }
    onClick=(_id)=>{
        this.props.deletePost(_id);
        
    }
    onClickLike=(_id, user)=>{
      this.props.getLikes(_id, user);
    }
    unLike=(_id)=>{
      this.props.clearLike(_id);
    }
  render() {
      const {posts, alert, user}=this.props;
      const {text, check}=this.state;
    return (
      <Fragment>

      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

      <div style={{padding:2}} className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        {alert?(
            <Alert color="primary">{alert}</Alert>
        ):null}
        {!check?(
            setTimeout(()=>(this.setState({check:true})),10000)
        ):(
            <form onSubmit={this.onSubmit} className="form my-1">
                <textarea
                  name="text"
                  cols="30"
                  rows="5"
                  placeholder="Create a post" value={text} onChange={this.onChange}
                  
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
              </form>
            )
        }
      </div>
        {posts.map(post=>(
            <div style={{padding:"0.2rem"}} className="container bg-muted  ">
                  <div className="post bg-white ">
                    <div>
                        <img
                          className="round-img"
                          src={post.avatar}
                          alt="beauty"
                        />
                        <h4>{post.name}</h4>
                    </div>
                    <div>
                      <p className="my-1">
                        {post.text}
                      </p>
                       <p className="post-date">
                          <Moment format='YYYY-MM-DD'>{post.date}</Moment>
                      </p>             
                        <button  onClick={this.onClickLike.bind(this, post._id,user._id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>{' '}
                        <span >{post.likes.length>0?(
                            post.likes.length 
                        ):null}</span>
                      </button>                   
                      <button onClick={this.unLike.bind(this, post._id)}  type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                      <Link onClick={this.onClick123.bind(this, post._id)} to={`/individualPost/${post._id}`} type="button" className="btn btn-light">
                        Comment{" "}<span className="comment-count">{post.comments.length?(
                            post.comments.length
                        ):null}</span>
                        
                      </Link>
                      {post.email===user.email?(
                          <button      
                          type="button" onClick={this.onClick.bind(this,post._id)}
                          className="btn btn-danger">
                          <i className="fas fa-times"></i>
                        </button>
                      ):null}
                    </div>
                  </div> 
                </div>
        ))}
      </Fragment>
    )
  }
}
const mapStateToProps=state=>({
    posts:state.post.posts,
    user:state.auth.user,
    alert:state.error.alert
})
export default connect(mapStateToProps,{getAllPost,
     postApost, deletePost, getLikes, clearLike, getIndividualPost}) (AllPost);