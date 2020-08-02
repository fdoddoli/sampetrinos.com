import React, { Component } from "react";
import Notifications from "./Notifications";
import Boy from "./Boy";
import { connect } from "react-redux";
import { likeBoy } from "../../../store/actions/boyActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Chat from "../chat/chat";
import { left } from "styled-system";
import { updateLastSeenGirl } from "../../../store/actions/chatActions";

class DashboardGirls extends Component {
  state = {
    idBoy: "",
    idGirl: "",
    firstName: "Rodrigo Miñaro",
    imgFileURL: "/img/test.JPG",
    actualChat: null,
  };

  setActualChat = (idx, userID) => {
    const { matches } = this.props;
    if (idx === -1) {
      this.setState({ actualChat: null });
    } else {
      this.setState({ actualChat: matches[idx] });
      this.props.updateLastSeenGirl(matches[idx].id);
    }
  };

  handleClickToChangeBoy = (e) => {
    const { boys } = this.props;
    let boy = boys[Math.floor(Math.random() * boys.length)];
    this.setState({
      idBoy: boy.id,
      firstName: boy.firstName,
      imgFileURL: boy.imgFileURL,
    });
  };

  handleClickToLikeBoy = (e) => {
    const { boys, auth } = this.props;
    let boy = boys[Math.floor(Math.random() * boys.length)];
    this.setState({
      idBoy: boy.id,
      idGirl: auth.uid,
      firstName: boy.firstName,
      imgFileURL: boy.imgFileURL,
    });
    this.props.likeBoy(this.state);
  };

  render() {
    const { auth, users, matches, profile } = this.props;
    const { actualChat } = this.state;
    let action;
    if (actualChat !== null) {
      action = (
        <div
          style={{
            padding: "0%",
            width: "20",
            position: "absolute",
            marginLeft: "38%",
            backgroundColor: "white",
            borderTop: "3px solid lightgrey",
          }}
        >
          <Chat
            closeChat={() => this.setActualChat(-1)}
            chat={actualChat.id}
            user={users[actualChat.idUserBoy]}
          />
        </div>
      );
    } else {
      action = (
        <div class="col s12 m7 l6">
          <Boy
            boy={this.state}
            handleClickToLikeBoy={this.handleClickToLikeBoy}
            handleClickToChangeBoy={this.handleClickToChangeBoy}
          />
        </div>
      );
    }
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div class="row">
          <div class="col s12 m5 l6">
            <Notifications
              openChat={this.setActualChat}
              matches={matches}
              users={users}
              profile={profile}
            />
          </div>

          {action}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    matches: state.firestore.ordered.matches,
    profile: state.firebase.profile,
    users: state.firestore.data.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeBoy: (boy) => dispatch(likeBoy(boy)),
    updateLastSeenGirl: (convID) => dispatch(updateLastSeenGirl(convID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "matches",
        where: ["idUserGirl", "==", props.profile.userID],
      },
      { collection: "users" },
    ];
  })
)(DashboardGirls);
