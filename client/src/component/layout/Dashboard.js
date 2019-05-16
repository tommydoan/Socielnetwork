import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {getCurrentProfiles} from '../../action/profileAction';
import {Link} from 'react-router-dom';
import {createOrEditProfile} from '../../action/profileAction';
import Profiles from '../profile/Profiles'
//import {Button} from 'reactstrap'
class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfiles();
  }
  render() {
    const {user,profiles}=this.props;
    if(user){
      return (
        <Fragment > 
           <div style={{marginTop:'0.5rem'}}  className="container">
              <h3 style={{marginTop:"0.5rem"}}><strong className> 
              <i className="fas fa-user"></i>
              Welcome {user.email} to DevConnector</strong></h3>
            {profiles.length===0?(
              <Fragment>
              <p>You have not still created profiles. Let{" "}
                <Link to="/create-profile">Create Profiles</Link>
              </p>
          </Fragment>
            ):(
              <Fragment>
                    <Link className="btn btn-primary" to="edit-profile" ><i className="fas fa-user-circle text-white" ></i>
                    <span className="text-white">Edit Profile</span></Link>
                    <Link className="btn btn-primary" to="addexperience" ><i className="fas fa-user-circle text-white" ></i>
                    <span className="text-white">Add Experience</span></Link>
                    <Link className="btn btn-primary" to="education" ><i className="fas fa-user-circle text-white" ></i>
                    <span className="text-white">Add Education</span></Link><br/>
                    <div className="py-3 pt-3">
                    <Profiles/> 
                    </div>
              </Fragment>
            )}           
           </div>
         </Fragment>
      ) 
    }else {
      return <div>Loading ...</div>
    }
  }
}
const mapStateToProps=state=>({
  profiles:state.profile.profiles,
  user:state.auth.user
})
export default connect(mapStateToProps,{getCurrentProfiles,createOrEditProfile}) (Dashboard);