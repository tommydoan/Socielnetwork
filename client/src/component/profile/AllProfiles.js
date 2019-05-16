import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfiles} from '../../action/profileAction'
class AllProfiles extends Component {
    componentDidMount(){
     this.props.getCurrentProfiles();
      }
  render() {
      const {profile}=this.props;
      if(profile){
        return (
            <Fragment>
                {profile.map(profile=>(
                    <div className="profile bg-light">
                    <img src={"profile.user.avatar"} alt="beauty" className="round-img"/>
                    <div>
                        <h2>{profile.Name}</h2>
                        <p>{profile.Status}</p>
                        <p>{profile.Company}</p>
                        <p>{profile.Location}</p>
                        <p>{profile.Country}</p>
                        <Link className="btn btn-success" to={`/profiles/${profile.user}`} >View Profile</Link>
                    </div>
                    <ul>{profile.Skills.map((skill,index)=>(
                        <li><i className="fas fa-check"></i>
                        {skill}</li>
                    ))}</ul>
                  </div>
                ))}
            </Fragment>
          )
      }else {
          return (
              <h1>Loading...</h1>
          )
      }
  }
}
const mapStateToProps=state=>({
    profile:state.profile.profile,
    user:state.profile.profile.user
})
export default connect(mapStateToProps,{getCurrentProfiles}) (AllProfiles);