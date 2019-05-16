import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import {createOrEditProfile} from '../../action/profileAction';
import {Alert} from 'reactstrap';
import {Link} from 'react-router-dom'
import {setAlert} from '../../action/errorAction'
class CreateProfile extends Component {
    state={
        Company:"",Location:"",Bio:"",Skills:"",Gender:"",Country:"",youtube:"",
        facebook:"",twitter:"",instagram:"",Status:"",Name:"",
         show:false,    
     }
     toggle=()=>{
         this.setState({show:!this.state.show})
     }
     onChange=e=>{
         this.setState({[e.target.name]:e.target.value})
     }
     onSubmit=e=>{
        const {Company,Location,Bio,Skills,Gender,Country,youtube,
            facebook,twitter,instagram,Status,Name}=this.state;
         e.preventDefault();
         const newProfile ={Company,Location,Bio,Skills,Gender,Country,youtube,
            facebook,twitter,instagram,Status,Name}
         
         this.props.createOrEditProfile(newProfile);
         this.props.history.push('/profiles');
     }   
   render() {
    const { Company,Location,Bio,Skills,Gender,Country,youtube,
        facebook,twitter,instagram,Status,Name,show } = this.state;
        const {alert}=this.props;
        
     return (
            <Fragment>
                {alert?(
                    <Alert color="primary">{alert}</Alert>
                ):null}
             <section style={{marginTop:"0.2rem"}} className="container">
                     <h1 className="large text-primary">
                         Create Your Profile
                     </h1>
                     <p className="lead">
                         <i className="fas fa-user"></i> Let's get some information to make your
                         profile stand out
                     </p>
                     <small>* = required field</small>
                     <form onSubmit={this.onSubmit} className="form">
                         <div className="form-group">
                        <select name="Status" value={Status} onChange={this.onChange} >
                         <option value="0">* Select Professional Status</option>
                         <option value="Developer">Developer</option>
                         <option value="Junior Developer">Junior Developer</option>
                         <option value="Senior Developer">Senior Developer</option>
                         <option value="Manager">Manager</option>
                         <option value="Student or Learning">Student or Learning</option>
                         <option value="Instructor">Instructor or Teacher</option>
                         <option value="Intern">Intern</option>
                         <option value="Other">Other</option>
                     </select>
                     <small className="form-text"
                             >Give us an idea of where you are at in your career</small
                         >
                         </div>
                         <div className="form-group">
                         <input type="text" placeholder="Name" name="Name" value={Name} onChange={this.onChange} required />
                         <small className="form-text"
                             >Could be your user name which prepresent for you</small
                         ></div>
                         <div className="form-group">
                         <input type="text" placeholder="Company" name="Company"  value={Company} onChange={this.onChange} />
                         <small className="form-text"
                             >Could be your own company or one you work for</small
                         >
                         </div>              
                         <div className="form-group">
                         <input type="text" placeholder="Location" name="Location"  value={Location} onChange={this.onChange} />
                         <small className="form-text"
                             >City & state suggested (eg. Boston, MA)</small
                         >
                         </div>
                         <div className="form-group">
                         <input type="text" placeholder="* Skills" name="Skills"  value={Skills} onChange={this.onChange} />
                         <small className="form-text"
                             >Please use comma separated values (eg.
                             HTML,CSS,JavaScript,PHP)</small
                         >
                         </div>
                         <div className="form-group">
                         <input type="text" placeholder="Gender" name="Gender"  value={Gender} onChange={this.onChange} />
                         <small className="form-text"
                             >Could be yourself</small
                         >
                         </div>
                         <div className="form-group">
                         <input
                             type="text"
                             placeholder="Country"
                             name="Country" value={Country} onChange={this.onChange} 
                         /> </div>
                     <small className="form-text"
                         >If you want your latest repos and a Github link, include your
                         username</small
                     >
                    
                     <div className="form-group">
                     <textarea placeholder="A short bio of yourself" name="Bio" value={Bio} onChange={this.onChange}>
                     </textarea>
                     <small className="form-text">Tell us a little about yourself</small>
                     </div>
 
                     <div className="my-2">
                     <button type="button" className="btn btn-light" onClick={this.toggle}>
                         Add Social Network Links
                     </button>
                     <span>Optional</span>
                     </div>
                     {show?(
                          <Fragment>
                             <div className="form-group social-input">
                             <i className="fab fa-twitter fa-2x"></i>
                             <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={this.onChange} />
                             </div>
 
                             <div className="form-group social-input">
                             <i className="fab fa-facebook fa-2x"></i>
                             <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={this.onChange} />
                             </div>
 
                             <div className="form-group social-input">
                             <i className="fab fa-youtube fa-2x"></i>
                             <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={this.onChange} />
                             </div>
                             <div className="form-group social-input">
                             <i className="fab fa-instagram fa-2x"></i>
                             <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={this.onChange} />
                             </div>
                          </Fragment>   
                     ):null}
                     <input type="submit" className="btn btn-primary my-1" />
                        <Link to="dashboard" className="btn btn-secondary" ><span className="text-white">Go Back 
                     <i className="fas fa-arrow-circle-right" ></i></span></Link>
                 </form>
             </section>
            </Fragment>
     )
   }
}
const mapStateToProps=state=>({
    alert:state.error.alert
})
export default connect(mapStateToProps,{createOrEditProfile,setAlert}) (CreateProfile);