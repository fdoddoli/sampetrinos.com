import React, { Component } from "react";
import Notifications from "./NotificationsBoys";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Chat from "../chat/chat";
import { updateLastSeenBoy } from "../../../store/actions/chatActions";

class DashboardBoys extends Component {
  state = {
    actualChat: null,
  };

  setActualChat = (idx, userID) => {
    const { matches } = this.props;
    if (idx === -1) {
      this.setState({ actualChat: null });
    } else {
      this.setState({ actualChat: matches[idx] });
      this.props.updateLastSeenBoy(matches[idx].id);
    }
  };

  render() {
    const { auth, girlsWhoLikeMe, matches, users, profile } = this.props;
    const { actualChat } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;
    let action;
    if (actualChat === null) {
      action = (
        <div className="section center intro-text">
          <h5 className="black-text intro-text">
            Got any matches? Click on them to Start Chatting
          </h5>
          <i class="medium material-icons red-text text-accent-3">mood</i>
        </div>
      );
    } else {
      action = (
        <div
          style={{
            padding: "0%",
            width: "142%",
            backgroundColor: "white",
            borderTop: "3px solid lightgrey",
          }}
        >
          <Chat
            closeChat={() => this.setActualChat(-1)}
            chat={actualChat.id}
            user={users[actualChat.idUserGirl]}
          />
        </div>
      );
    }
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m5 l6">
            <Notifications
              girlsWhoLikeMe={girlsWhoLikeMe}
              openChat={this.setActualChat}
              matches={matches}
              users={users}
              profile={profile}
            />
          </div>

          <div className="col s12 m7 l6">{action}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const matches = state.firestore.ordered.matches || state.boy.boys;
  const users = state.firestore.ordered.users || state.boy.boys;
  const auth = state.firebase.auth;
  const uid = auth.uid;

  //LIKES THIS USER HAS
  const myLikes = matches.filter((like) => {
    if (like.idUserBoy == uid && like.status == false) return like;
  });

  //GIRLS WHO LIKED THIS USER
  const girlsWhoLikeMe = [];
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < myLikes.length; j++) {
      if (users[i].id == myLikes[j].idUserGirl) {
        girlsWhoLikeMe.push(users[i]);
      }
    }
  }

  return {
    girlsWhoLikeMe: girlsWhoLikeMe,
    users: state.firestore.data.users,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    matches: state.firestore.ordered.matches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLastSeenBoy: (convID) => dispatch(updateLastSeenBoy(convID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "matches",
        where: ["idUserBoy", "==", props.profile.userID],
      },
      { collection: "users" },
    ];
  })
)(DashboardBoys);
