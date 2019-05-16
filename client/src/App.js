import React ,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import Landing from './component/layout/Landing';
import AppNavbar from './component/layout/AppNavbar';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import PrivateRoute from './component/routing/PrivateRoute'
import Dashboard from './component/layout/Dashboard';
import CreateProfile from './component/profile/CreateProfile';
import {loadUser} from './action/authAction';
import EditProfile from './component/profile/EditProfile';
import Education from './component/profile/Education';
import AddExperience from './component/profile/AddExperience';
import ExPerience from './component/profile/ExPerience';
//import Profiles from './component/profile/Profiles';
import IndividualProfiles from './component/profile/IndividualProfiles';
import AddEducation from './component/profile/AddEducation';
import AllProfiles from './component/profile/AllProfiles';
import {getAllProfiles} from './action/profileAction'
import ProfileforID from './component/profile/ProfileforID/ProfileforID';
import AllPost from './component/post/AllPost';
import IndividualPost from './component/post/IndividualPost';
//import {tokenconfig} from './action/authAction'
class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
    store.dispatch(getAllProfiles());
}
  render() {
    return (
      <Provider store={store}>
      <Router>
        <AppNavbar/>
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Switch>           
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            <PrivateRoute exact path="/education" component={Education}/>
            <PrivateRoute exact path="/addexperience" component={AddExperience}/>
            <PrivateRoute exact path="/exprience" component={ExPerience}/>       
            <PrivateRoute exact path="/individual-profiles" component={IndividualProfiles}/>
            <PrivateRoute exact path="/addeducation" component={AddEducation}/>
            <PrivateRoute exact path="/allprofiles" component={AllProfiles}/>
            <PrivateRoute exact path="/profiles/:_id" component={ProfileforID}/>
            <PrivateRoute exact path="/allposts" component={AllPost}/>
            <PrivateRoute exact path="/individualPost/:id" component={IndividualPost}/>

          </Switch>
        </section>
      </Router>
      </Provider>
    )
  }
}
export default App;
