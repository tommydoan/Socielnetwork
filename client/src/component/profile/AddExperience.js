import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
//import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {experience} from '../../action/profileAction'
class AddExperience extends Component {
  state={
    title:"",company:"",from:"",to:"",description:"",location:"",
  }
  onChange=e=>{
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit=e=>{
    e.preventDefault();
    const {title,company,from,to,current,description,location} =this.state;
    const newExp={
      title,company,from,to,current,description,location
    }
    this.props.experience(newExp);
    this.props.history.push('/allprofiles');
  }
  render() {
    const {title,company,from,to,description,location}=this.state;
    return (
      <Fragment>
            <section style={{marginTop:'0.2rem'}} className ="container">
            <h1 className ="large text-primary">
            Add An Experience
            </h1>
            <p className ="lead">
              <i className ="fas fa-code-branch"></i> Add any developer/programming
              positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className ="form" onSubmit={this.onSubmit} >
              <div className ="form-group">
                <input type="text" placeholder="* Job Title" name="title" value={title} required onChange={this.onChange} />
              </div>
              <div className ="form-group">
                <input type="text" placeholder="* Company" name="company" value={company} required onChange={this.onChange} />
              </div>
              <div className ="form-group">
                <input type="text" placeholder="Location" value={location} name="location" onChange={this.onChange} />
              </div>
              <div className ="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={this.onChange}/>
              </div>
              
              <div className ="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={this.onChange}/>
              </div>
              <div className ="form-group">
                <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Job Description" value={description} onChange={this.onChange}
                ></textarea>
              </div>
              <input type="submit" className ="btn btn-primary my-1" />
              <Link className ="btn btn-secondary" to="dashboard">Go Back</Link>
            </form>
            
          </section>
      </Fragment>
    )
  }
}
export default connect(null,{experience}) (AddExperience);