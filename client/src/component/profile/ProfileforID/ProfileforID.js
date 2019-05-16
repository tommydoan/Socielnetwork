import React, { Component, Fragment } from 'react'
import ExPerience from '../ExPerience';
import IndividualProfiles from '../IndividualProfiles';
import Education from '../Education';
import {Button, Modal, ModalHeader, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {deleteProAndUser, getProfilebyId} from '../../../action/profileAction';
class ProfileforID extends Component {
  state={
    isOpen:false
  }
  componentDidMount(){
    const {_id}=this.props.match.params;
    this.props.getProfilebyId(_id);
  }
  toggle=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }
  onClick=e=>{
    this.props.deleteProAndUser();
  }
  render() {
    const {user, _id}=this.props;
    const ButtonModal=(
      <Fragment>
          <Button onClick={this.toggle} color="danger" >Delete This Profile</Button>
                <Modal isOpen={this.state.isOpen} >
                  <ModalHeader>Are you sure to delete this temporary Account?</ModalHeader>
                  <ModalFooter>
                    <Button onClick={this.onClick} >Yes</Button>
                    <Button onClick={this.toggle}>No</Button>
                  </ModalFooter>
                </Modal>
      </Fragment>
    )
    return (
      <Fragment>

                <div>
                <IndividualProfiles/>
                </div>
                <div style={{marginTop:"1rem"}}><Education/></div>
                <div style={{marginTop:"1rem"}}><ExPerience/></div>
                {user._id===_id?(
                  <div>
                    {ButtonModal}
                  </div>
                ):null}
      </Fragment>
    )
  }
}
const mapStateToProps=state=>({
  user:state.profile.profiles.user,
  _id:state.auth.user._id
})
export default connect(mapStateToProps,{deleteProAndUser, getProfilebyId}) (ProfileforID);