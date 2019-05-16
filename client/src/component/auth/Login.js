import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom';
import {Card, CardBody, Form, FormGroup,Label, Input,Button,Alert} from 'reactstrap';
import {login,loadUser} from '../../action/authAction';
import {clearError} from '../../action/errorAction'
import {connect} from 'react-redux';
class Login extends Component {
    state={
        email:"",
        password:"",
        msg:""
        
    }
    componentDidUpdate(prevProps){
        const {error,user,isAuthenticated}=this.props;
        if(error!==prevProps.error){
            if(user==='LOGIN_FAIL'){
                this.setState({msg:error.msg})
            }           
        }
        if(isAuthenticated){
            this.props.clearError();
            this.props.history.push('/dashboard');
        }
    }
    onChange=e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit=e=>{
        e.preventDefault();
        const {email, password}=this.state;
        const User={
            email,
           password
        }
        this.props.login(User)
    }
  render() {
      const {msg}=this.state;
      const {user}=this.props;
    return (
      <Fragment>
          <div className="row">
            <div className="col-md-6 mx-auto ">
            <Card >
                <h3 style={{marginTop:"1rem"}} className="text-primary mx-auto">
                    <strong><i className="fas fa-lock"></i> Login </strong>
                </h3>    
                {user?(
                    <Alert color="danger">{msg.msg}</Alert>
                ):null}
            <CardBody>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" className="form-control" required
                            placeholder="Enter Email" name="email" value={this.state.email}
                            onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" className="form-control" required
                            placeholder="Enter Password" name="password" value={this.state.password}
                            onChange={this.onChange}/>
                    </FormGroup>
                    
                    <Button color="primary" block>Submit</Button>
                </Form>
                <div className="text-muted">Have account ready? please <Link to="/login">login</Link> </div>
            </CardBody>
          </Card>
            </div>
          </div>
      </Fragment>
    )
  }
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error,
    user:state.error.user
})
export default connect(mapStateToProps,{login,loadUser,clearError}) (Login);