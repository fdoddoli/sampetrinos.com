import React, { Component } from "react";
import Notifications from "./NotificationsBoys";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Chat from "../chat/chat";
import { updateLastSeenBoy } from "../../../store/actions/chatActions";
import { likeGirl, deleteMatch } from "../../../store/actions/boyActions";

class DashboardBoys extends Component {
  state = {
    actualChat: null,
    firstName: "",
    imgFileURL: "",
    idUserGirl: "",
    idUserBoy: "",
    school: "",
  };

  setActualChat = (idx, userID) => {
    this.handleClickStopShowingGirlWhoLikedUser();
    const { matches } = this.props;
    if (idx === -1) {
      this.setState({ actualChat: null });
    } else {
      this.setState({ actualChat: matches[idx] });
      this.props.updateLastSeenBoy(matches[idx].id);
    }
  };

  handleClickShowGirlWhoLikedUser = (firstName, imgFileURL, id, school) => {
    const { auth } = this.props;

    this.setState({
      firstName: firstName,
      imgFileURL: imgFileURL,
      idUserGirl: id,
      idUserBoy: auth.uid,
      school: school,
    });
  };
  handleClickLikeGirlWhoLikedUser = (girl) => {
    console.log(this.state);
    const { myLikes } = this.props;
    //Returns the match that this user wants to make true
    const myFutureMatch = myLikes.filter((match) => {
      if (
        match.idUserBoy == this.state.idUserBoy &&
        match.status == false &&
        match.idUserGirl == this.state.idUserGirl
      )
        return match;
    });
    //makes match true
    this.props.likeGirl(myFutureMatch);

    //clear
    this.handleClickStopShowingGirlWhoLikedUser();
  };

  handleClickStopShowingGirlWhoLikedUser = (e) => {
    this.setState({
      firstName: "",
      imgFileURL: "",
      idUserGirl: "",
      school: "",
    });
  };

  handleClickStopShowingGirlWhoLikedUserAndDeleteMatch = (e) => {
    const { myLikes } = this.props;

    //Returns the 'match'(status:false) that this user wants to delete
    const matchIWantToDelete = myLikes.filter((match) => {
      if (
        match.idUserBoy == this.state.idUserBoy &&
        match.status == false &&
        match.idUserGirl == this.state.idUserGirl
      )
        return match;
    });

    //Deletes match
    this.props.deleteMatch(matchIWantToDelete);

    //clear
    this.handleClickStopShowingGirlWhoLikedUser();
  };

  render() {
    const { auth, girlsWhoLikeMe, matches, users, profile } = this.props;
    const { actualChat } = this.state;
    let rightDashboard;
    if (this.state.firstName !== "") {
      rightDashboard = (
        <div className="card center dashboard-girl">
          <div className="card-image  center">
            <img className="responsive-img" src={this.state.imgFileURL} />
          </div>
          <div className="card-content">
            <h5 className="boy-name">{this.state.firstName}</h5>
            <p className="girl-school blue-text">{this.state.school}</p>
            <button
              className="waves-effect btn-floating waves-light btn-large white"
              onClick={
                this.handleClickStopShowingGirlWhoLikedUserAndDeleteMatch
              }
            >
              <i class="large material-icons grey-text">close</i>
            </button>
            <button
              className="waves-effect btn-floating waves-light btn-large white"
              onClick={this.handleClickLikeGirlWhoLikedUser}
            >
              <i class="large material-icons blue-text text-darken-4">check</i>
            </button>
          </div>
        </div>
      );
    } else if (actualChat !== null) {
      rightDashboard = (
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
    } else {
      rightDashboard = (
        <div className="section center intro-text">
          <h5 className="black-text intro-text">
            Got any matches? Click on them to Start Chatting
          </h5>
          <i class="medium material-icons blue-color-accen">mood</i>
        </div>
      );
    }
    if (!auth.uid) return <Redirect to="/signin" />;
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
              // girlsWhoMatchWithMe={girlsWhoMatchWithMe}
              handleClickShowGirlWhoLikedUser={
                this.handleClickShowGirlWhoLikedUser
              }
            />
          </div>
          <div className="col s12 m7 l6">{rightDashboard}</div>
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
    myLikes: myLikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeGirl: (myFutureMatch) => dispatch(likeGirl(myFutureMatch)),
    deleteMatch: (matchIWantToDelete) =>
      dispatch(deleteMatch(matchIWantToDelete)),
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
