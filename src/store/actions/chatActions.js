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
export const getMessages = (chatID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const messages = [];
    const db = firebase.database().ref(`/messages/${chatID}`).limitToLast(50);
    db.once("value", (snap) => {
      snap.forEach((data) => {
        const message = data.val();
        messages.push(message);
      });
    }).then(() => dispatch({ type: "GET_MESSAGES", messages }));
  };
};
export const watchTaskAddedEvent = (chatID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.database().ref(`/messages/${chatID}`).limitToLast(10);
    db.on("child_added", (snap) => {
      const added = snap.val();
      dispatch({ type: "MESSAGE_ADDED_LISTENER", added });
    });
  };
};
export const watchTaskRemovedEvent = (chatID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.database().ref(`/messages/${chatID}`).limitToLast(10);
    db.on("child_removed", (snap) => {
      const removed = snap.val();
      dispatch({ type: "MESSAGE_REMOVED_LISTENER", removed });
    });
  };
};
export const hireStudentInterview = (jobStudentID, jobOfferID, studentID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    let numerHired;
    let numerNeeded;
    let { info } = firebase;
    db.collection("JobOffersyStudents")
      .doc(jobStudentID)
      .update({ status: "Hired" })
      .then(
        db
          .collection("JobOffers")
          .doc(jobOfferID)
          .get()
          .then((snapshot) => {
            info = snapshot.data();
            numerHired = info.hired;
            numerNeeded = info.needed;
            db.collection("JobOffers")
              .doc(jobOfferID)
              .update({ hired: numerHired + 1, needed: numerNeeded - 1 });
            db.collection("Notifications").add({
              JobOffer: info.name,
              type: "Hired",
              userID: studentID,
            });
          })
      );
  };
};

export const rejectStudentInterviewWChat = (
  jobStudentID,
  jobOfferID,
  studentID
) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    let { info } = firebase;
    db.collection("JobOffersyStudents")
      .doc(jobStudentID)
      .delete()
      .then(() =>
        firebase.database().ref(`/messages/${jobStudentID}`).remove()
      );
    db.collection("JobOffers")
      .doc(jobOfferID)
      .get()
      .then((snapshot) => {
        info = snapshot.data();
        db.collection("Notifications").add({
          JobOffer: info.name,
          type: "Interview Denied",
          userID: studentID,
        });
      });
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
