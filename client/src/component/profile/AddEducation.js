import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addEducation} from '../../action/profileAction'
class AddEducation extends Component {
    state={
       school:"",degree:"",fieldofstudy:"",from:"",to:"",current:"",description:""
    }
    onChange=e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit=e=>{
        e.preventDefault();
       const {school,degree,fieldofstudy,from,to,description}=this.state;
       const newEdu={
        school,degree,fieldofstudy,from,to,description
       }
       this.props.addEducation(newEdu);
       this.props.history.push('/allprofiles')
    }
  render() {
    const {school,degree,fieldofstudy,from,to,description}=this.state;
    return (
      <Fragment>
        <section style={{marginTop:"0.5rem"}} className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form onSubmit={this.onSubmit} className="form">
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    required value={school} onChange={this.onChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    required value={degree} onChange={this.onChange}
                />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={this.onChange} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={this.onChange} />
                </div>
                <div className="form-group">
                <p>
                    <input type="checkbox" name="current" value="" /> Current School or Bootcamp
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={this.onChange} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description" value={description} onChange={this.onChange}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light" to="/dashboard">Go Back</Link>
            </form>
            </section>          
      </Fragment>
    )
  }
}
export default connect(null,{addEducation}) (AddEducation);