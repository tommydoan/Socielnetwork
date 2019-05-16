import React, { Component,Fragment } from 'react'
import {Nav, Navbar,NavbarBrand,NavItem,NavbarToggler,Collapse} from 'reactstrap';
import {Link} from 'react-router-dom';
import {logout} from '../../action/authAction'
import { connect } from 'react-redux';
class AppNavbar extends Component {
  state={
    isOpen:false
  }
  toggle=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }
  onClick=()=>{
    this.props.logout();
  }
  render() {
    const auth=(
              <Fragment>
                <NavItem>
                    <Link className="btn btn-dark" to="/login">Login</Link>
                </NavItem>
                <NavItem>
                  <Link className="btn btn-dark" to="/register">
                    <i class="fas fa-cog"></i> Register
                  </Link>
                </NavItem>
              </Fragment>

    )
    const {isAuthenticated}=this.props;
    return (
        <Navbar color="dark" dark expand="sm">
          <NavbarBrand href="#"><i className="fas fa-code"></i> 
            <Link className="btn btn-dark btn-sm" to="/"><h4 className="text-white">Dev Connector</h4></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto">
              {isAuthenticated?(
                <Fragment>
                  <NavItem  >
                        <Link className="btn btn-dark mx-auto" to="/allprofiles" >
                        <i className="fas fa-user-circle"></i> Lobby
                        </Link>
                  </NavItem>  
                  <NavItem >
                  <Link className="btn btn-dark" to="/allposts" >
                  <i className="fas fa-bells"></i> Posts
                  </Link>
                  </NavItem>                      
                  <NavItem >
                    <Link className="btn btn-dark" to="/dashboard" >
                    <i class="fas fa-user-circle"></i> Profiles
                    </Link>
                  </NavItem>
                  <NavItem onClick={this.onClick} >
                    <Link className="btn btn-dark" to="/login" >
                      <i class="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </NavItem> 
               </Fragment>
              ):auth}
            </Nav>
          </Collapse>
        </Navbar>
 
    )
  }
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated,
  profiles:state.profile.profiles,
  
})
export default connect(mapStateToProps,{logout}) (AppNavbar);