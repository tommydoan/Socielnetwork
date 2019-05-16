import React, {Component,Fragment} from 'react'
import {Link} from 'react-router-dom';
import {getCurrentProfiles} from '../../action/profileAction';
import {connect} from 'react-redux';
class Landing extends Component {
  componentDidMount(){
    this.props.getCurrentProfiles();
  }
  render() {
      return (
        <Fragment>
            <section className="landing">
              <div className="dark-overlay">
                <div className="landing-inner">
                  <h1 className="x-large">Developer Connector</h1>
                  <p className="lead">
                    Create a developer profile/portfolio, share posts and get help from
                    other developers
                  </p>
                <div className="buttons">
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                  <Link to="/login" className="btn btn-light">Login</Link>
                </div>
              </div>
            </div>
        </section>
        </Fragment>
    )
  }
}


export default connect(null,{getCurrentProfiles}) (Landing)
