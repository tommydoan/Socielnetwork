import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap'
import {deleteEducation, getCurrentProfiles} from '../../action/profileAction';
import Moment from 'react-moment';
class Education extends Component {
  onClick=(_id)=>{
    this.props.deleteEducation(_id);
  }
  render() {
    //const {school, degree, fieldofstudy, from, to, current}=this.props.education;
    const {education, user, _id}=this.props;
    if(education.length>0){
      return (
        <Fragment>
            {education.map(edu=>(
              <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              <div>
                <h3>{edu.school}</h3>
                <Moment format='YYYY/MM/DD' >{edu.from}
                </Moment>
                <p><strong>Degree: </strong>{edu.degree}</p>
                <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                  ipsam, sapiente suscipit dicta eius velit amet aspernatur
                  asperiores modi quidem expedita fugit.
                </p>
              </div>
              {user._id===_id?(
                <div>
                  <Link to="/addeducation" className="btn btn-primary" >Add more Educations</Link>
                  <Button color="danger" onClick={this.onClick.bind(this,edu._id)}>Delete this Education</Button>
                </div>
              ):null}
            </div>
            ))}
        </Fragment>
      )
    }else {
      return (
        <Fragment>
          <h3>Please Add your Education...</h3><br/>
          <Link to="addeducation" className="btn btn-primary">Add more Educations</Link>
        </Fragment>
      )
    }
  }
}
const mapStateToProps=state=>({
  education:state.profile.profiles.education,
  user:state.profile.profiles.user,
  _id:state.auth.user._id
})
export default connect(mapStateToProps,{deleteEducation, getCurrentProfiles}) (Education);