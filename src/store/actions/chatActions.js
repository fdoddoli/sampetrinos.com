const { v4: uuidv4 } = require("uuid");
export const sendMessage = (message, convID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const state = getState().firebase;
    const { profile } = state;
    firebase.database().ref(`messages/${convID}`).push({
      id: uuidv4(),
      message: message.message,
      timestamp: new Date().getTime(),
      sender: profile.userID,
    });

    if (profile.gender === "Male") {
      db.collection("matches").doc(convID).update({
        lastMessage: message.message,
        lMessageTimeB: new Date().getTime(),
      });
    } else {
      db.collection("matches").doc(convID).update({
        lastMessage: message.message,
        lMessageTimeG: new Date().getTime(),
      });
    }
  };
};

export const updateLastSeenBoy = (convID) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(convID);
    const firebase = getFirebase();
    const db = firebase.firestore();

    db.collection("matches").doc(convID).update({
      lastSeenB: new Date().getTime(),
    });
  };
};

export const updateLastSeenGirl = (convID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    db.collection("matches").doc(convID).update({
      lastSeenG: new Date().getTime(),
    });
  };
};
