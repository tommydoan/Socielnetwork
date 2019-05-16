import React, { Component, Fragment } from 'react'
import { deleteExperience, getCurrentProfiles } from '../../action/profileAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Moment from 'react-moment'
class ExPerience extends Component {
    onClick=(_id)=>{
        this.props.deleteExperience(_id)
    }
  render() {
      const {experience, user, _id}=this.props;
    if(experience.length>0){
        return (
            <Fragment>
                <section className="container">
                {experience.map(experience=>(
                    
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            <div>
                                <h3 className="text-dark">{experience.company}</h3>
                                <Moment format="YYYY/MM/DD">{experience.from}</Moment>
                                <p><strong>Position: </strong>{experience.title}</p>
                                <p><strong>Location: </strong>{experience.location}</p>
                                <p>
                                <strong>Description: </strong>{experience.description}
                                </p>
                            </div>        
                            {user._id===_id?(
                                <div>
                                    <Link to="addexperience" style={{marginTop:"0.2rem"}}  className="btn btn-primary">
                                    Add more Experiences</Link>         
                                    <Button onClick={this.onClick.bind(this,experience._id)} color="danger" >Delete this ExPerience</Button>
                                </div>
                            ):null}
                        </div>
                    
                ))}
                </section>
            </Fragment>
        )
      }else {
        return (
            <Fragment>
                <h2>Please Add Experiences</h2>
                <Link to="addexperience" style={{marginTop:"1rem"}} className="btn btn-primary">
                Add Experiences</Link>
            </Fragment>
        )
      }
  }
}
const mapStateToProps=state=>({
experience:state.profile.profiles.experience,
user:state.profile.profiles.user,
_id:state.auth.user._id
})
export default connect(mapStateToProps,{deleteExperience, getCurrentProfiles}) (ExPerience);