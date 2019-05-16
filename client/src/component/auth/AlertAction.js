import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import {Navbar,NavbarBrand} from 'reactstrap'
class AlertAction extends Component {
  state={
    isAuthenticated:true
  }
  
  render() {  
    setTimeout(()=>{
        this.setState({isAuthenticated:!this.state.isAuthenticated})
    },5000)
    const {isAuthenticated}=this.state;  
    return (            
        <Fragment>
          {isAuthenticated?(
            <Navbar   color="primary" expand="sm">
                    <NavbarBrand className="mx-auto" href="#">Welcome to DevConnector</NavbarBrand>
                </Navbar>
          ):null} 
        </Fragment>             
    )
  }
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
    //user:state.error.user
})
export default connect(mapStateToProps) (AlertAction);
