import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import DashboardGirls from "./components/dashboard/Girls/DashboardGirls";
import DashboardBoys from "./components/dashboard/Boys/DashboardBoys";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProfileDetails from "./components/Profile/ProfileDetails";
import { connect } from "react-redux";
import LandingPage from "./components/layout/LandingPage";

class App extends Component {
  render() {
    const { profile } = this.props;

    const dashboard =
      profile.gender === "Female" ? (
        <Route exact path="/dashboard" component={DashboardGirls} />
      ) : (
        <Route exact path="/dashboard" component={DashboardBoys} />
      );
    //<Route exact path='/' component={DashboardBoys}/>
    //<Route exact path='/' component={DashboardGirls}/>
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            {dashboard}
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile-details" component={ProfileDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(App);
