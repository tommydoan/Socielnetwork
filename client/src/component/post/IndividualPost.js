import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {getIndividualPost, addComment, deleteComment} from '../../action/postAction';
import {Button} from 'reactstrap';
import Moment from 'react-moment'
import {Link} from 'react-router-dom';
class IndividualPost extends Component {
    state={
        text:"",
       
    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.getIndividualPost(id);
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {_id}=this.props.post;
        const {text}=this.state;
        const newComment={
            text
        }
        this.props.addComment(_id, newComment)
    }
    onClick=(_id)=>{
        const id=this.props.post._id;
        this.props.deleteComment(id, _id);
    }
    onChange=e=>{
        this.setState({[e.target.name]:e.target.value})
    }
  render() {
      const {post, comments, user}=this.props;
      //const {likes}=this.props.post;
      const {text}=this.state;
    if(comments){
        return (
            <Fragment>
                <div style={{padding:2}} className="container bg-primary py-2 pt-2 ">
                      <div className="post bg-white p-1 my-1">
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
                        </div>
                      </div> 
                    </div>
                    <section style={{marginTop:"0.5rem"}} className="container">
                        <h4 className="muted">
                            Leave a Comment
                        </h4>
                        <div className="post-form">
                            <div className="bg-primary p">
                            <h4>Say Something...</h4>
                            </div>
                            <form onSubmit={this.onSubmit} className="form my-1">
                            <textarea
                                name="text"
                                cols="30"
                                rows="3"
                                placeholder="Comment here" value={text} onChange={this.onChange}                    
                            ></textarea>
                            <input type="submit" className="btn btn-dark my-1" value="Submit" />
                            </form>
                        </div>
                        </section>
                        <div>
                        {comments.map(comment=>(
                        <div class="post bg-white p-1 my-1">
                        <div>
                          <Link to={`/profileid/${comment.user}`}>
                            <img
                              class="round-img"
                              src={comment.avatar}
                              alt="beauty"
                            />
                            <h4>{comment.name}</h4>
                          </Link>
                        </div>
                        <div>
                          <p class="my-1">
                            {comment.text}
                          </p>
                           <Moment format="YYYY-MM-DD">
                              {comment.date}
                          </Moment>
                          {user._id===post.user?(
                            <Button onClick={this.onClick.bind(this,comment._id )} 
                            style={{float:"right"}} color="danger" sm >Delete Comment</Button>
                          ):null}
                        </div>
                        </div>
                    ))}
                        </div>
            </Fragment> 
        ) 
    }   else 
    {
        return <h4>Loading</h4>
    }
  }
}
const mapStateToProps=state=>({
    post:state.post.post,
    posts:state.post.posts,
    user:state.auth.user,
    comments:state.post.post.comments
})
export default connect(mapStateToProps, {getIndividualPost, addComment, deleteComment}) (IndividualPost);