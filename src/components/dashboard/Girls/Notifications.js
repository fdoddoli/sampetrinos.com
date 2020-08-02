import React, { Component } from "react";
import "materialize-css/js/collapsible";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Notifications extends Component {
  componentDidMount() {
    const elems = window.document.querySelectorAll(".collapsible");
    const options = {};
    window.M.Collapsible.init(elems, options);
  }

  render() {
    const { openChat, matches, profile, users } = this.props;
    let matchLikeLength;
    if (matches) {
      matchLikeLength = matches.length;
    } else {
      matchLikeLength = 0;
    }

    const matchList = matchLikeLength ? (
      matches.map(({ idUserBoy, idUserGirl, lastMessage }, idx) => {
        if (idUserGirl === profile.userID && lastMessage === "") {
          if (users[idUserBoy] !== undefined)
            return (
              <div class="collection" onClick={() => openChat(idx)}>
                <a
                  href="#!"
                  class="collection-item notification-item avatar black-text"
                >
                  <img className="circle" src={users[idUserBoy].imgFileURL} />
                  <p className="name-notifications">
                    {users[idUserBoy].firstName}
                  </p>
                </a>
                <div className="divider"></div>
              </div>
            );
          else {
            return null;
          }
        }
      })
    ) : (
      <div class="collection">
        <p>No matches yet</p>
      </div>
    );

    return (
      <div className="notifications">
        <div className="matches">
          <h5 className="black-tex title-sub-notifications">Matches</h5>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">
                <i className="material-icons">people</i>
                Check my matches
                <span className="badge red accent-3 white-text">2</span>
              </div>
              <div className="collapsible-body">{matchList}</div>
            </li>
          </ul>
        </div>

        <div className="Conversations">
          <h5 className="black-text title-sub-notifications">Conversations</h5>
          <div className="collection">
            {matches &&
              matches.map(
                (
                  {
                    idUserBoy,
                    idUserGirl,
                    lastMessage,
                    lastSeenG,
                    lMessageTimeB,
                  },
                  idx
                ) => {
                  if (idUserGirl === profile.userID && lastMessage !== "") {
                    let action;
                    if (lastSeenG < lMessageTimeB) {
                      action = <span class=" new badge red accent-3">1</span>;
                    }
                    if (users[idUserBoy] !== undefined)
                      return (
                        <a
                          href="#!"
                          class="collection-item notification-item avatar black-text"
                          onClick={() => openChat(idx)}
                        >
                          <img
                            className="circle"
                            src={users[idUserBoy].imgFileURL}
                          />
                          {action}
                          <p className="name-notifications">
                            {users[idUserBoy].firstName}
                          </p>
                          <p className="grey-text">{lastMessage}</p>
                        </a>
                      );
                    else {
                      return null;
                    }
                  }
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.data.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(Notifications);
