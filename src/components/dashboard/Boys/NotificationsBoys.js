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
    const likeListLength = this.props.girlsWhoLikeMe.length;

    const {
      openChat,
      girlsWhoLikeMe,
      girlsWhoMatchWithMe,
      matches,
      profile,
      users,
    } = this.props;
    let matchLikeLength;
    if (matches) {
      matchLikeLength = matches.length;
    } else {
      matchLikeLength = 0;
    }

    const likeList = likeListLength ? (
      girlsWhoLikeMe.map(({ firstName, imgFileURL, id, school }, idx) => {
        return (
          <div
            class="collection"
            onClick={() =>
              this.props.handleClickShowGirlWhoLikedUser(
                firstName,
                imgFileURL,
                id,
                school
              )
            }
          >
            <a
              href="#!"
              class="collection-item notification-item avatar black-text"
            >
              <img className="circle" src={imgFileURL} />
              <p className="name-notifications">{firstName}</p>
            </a>
            <div className="divider"></div>
          </div>
        );
      })
    ) : (
      <div class="collection">
        <p>No likes yet</p>
      </div>
    );
    const matchList = matchLikeLength ? (
      matches.map(({ idUserBoy, idUserGirl, lastMessage }, idx) => {
        if (idUserBoy === profile.userID) {
          return (
            <div class="collection" onClick={() => openChat(idx)}>
              <a
                href="#!"
                class="collection-item notification-item avatar black-text"
              >
                <img className="circle" src={users[idUserGirl].imgFileURL} />
                <p className="name-notifications">
                  {users[idUserGirl].firstName}
                </p>
              </a>
              <div className="divider"></div>
            </div>
          );
        }
      })
    ) : (
      <div class="collection">
        <p>No matches yet</p>
      </div>
    );
    return (
      <div className="notifications">
        <div className="Likes">
          <h5 className="black-tex title-sub-notifications">Likes</h5>
          <ul class="collapsible">
            <li>
              <div class="collapsible-header">
                <i class="material-icons">favorite</i>
                See who liked you
                <span class="badge button-blue white-text">
                  {likeListLength}
                </span>
              </div>
              <div class="collapsible-body">{likeList}</div>
            </li>
          </ul>
        </div>

        <div className="Matches">
          <h5 className="black-tex title-sub-notifications">Matches</h5>
          <ul class="collapsible">
            <li>
              <div class="collapsible-header">
                <i class="material-icons">people</i>
                Check my matches
                <span class="badge button-blue white-text">
                  {matchLikeLength}
                </span>
              </div>
              <div class="collapsible-body">{matchList}</div>
            </li>
          </ul>
        </div>

        <div className="Conversations">
          <h5 className="black-text title-sub-notifications">Conversations</h5>
          <div class="collection">
            {matches &&
              matches.map(
                (
                  {
                    idUserBoy,
                    idUserGirl,
                    lastMessage,
                    lastSeenB,
                    lMessageTimeG,
                  },
                  idx
                ) => {
                  if (idUserBoy === profile.userID && lastMessage !== "") {
                    let action;
                    if (lastSeenB < lMessageTimeG) {
                      action = <span class=" new button-blue">1</span>;
                    }
                    if (users[idUserGirl] !== undefined)
                      return (
                        <a
                          href="#!"
                          class="collection-item notification-item avatar black-text"
                          onClick={() => openChat(idx)}
                        >
                          <img
                            className="circle"
                            src={users[idUserGirl].imgFileURL}
                          />
                          {action}
                          <p className="name-notifications">
                            {users[idUserGirl].firstName}
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
