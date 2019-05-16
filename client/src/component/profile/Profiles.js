import React, { Component, Fragment } from 'react'
import ExPerience from './ExPerience';
import IndividualProfiles from './IndividualProfiles';
import Education from './Education';
import {Button, Modal, ModalHeader, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {deleteProAndUser, getProfilebyId} from '../../action/profileAction';
class Profiles extends Component {
  state={
    isOpen:false
  }
  toggle=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }
  onClick=e=>{
    this.props.deleteProAndUser();
  }
  render() {
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
                <div className="py-2 pt-2"><Education/></div>
                <div className="py-2 pt-2"><ExPerience/></div>
                <div className="py-2 pt-2" >
                  {ButtonModal}
                </div>
      </Fragment>
    )
  }
}
export default connect(null,{deleteProAndUser, getProfilebyId}) (Profiles);