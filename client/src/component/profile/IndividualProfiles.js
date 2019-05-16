import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {NavLink} from 'reactstrap'
class IndividualProfiles extends Component {
  render() {
      const {Company, Location, Gender, Country, Name, Bio, Skills}=this.props.profiles
    return (
      <Fragment>
                <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src=""
                    alt=""
                />
                <h1 className="large">{Name}</h1>
                <p className="lead">{Gender}</p>
                <p className="lead">{Company}</p>
                <p>{Location},{Country}</p>
                <div className="icons my-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://www.facebook.com/yoopjn.doan" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x"></i>
                    </a>
                </div>
                </div>
                <br/>
                <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{Name}'s Bio</h2>
                <p>
                    {Bio}
                </p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills"> 
                        <div className="p-1"><i className="fa fa-check"></i>{Skills}</div>
                </div>
                </div>
      </Fragment>
    )
  }
}
const mapStateToProps=state=>({
    profiles:state.profile.profiles
})
export default connect(mapStateToProps,null) (IndividualProfiles);