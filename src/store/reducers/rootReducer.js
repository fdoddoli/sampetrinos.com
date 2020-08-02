import authReducer from "./authReducer";
import boyReducer from "./boyReducer";
import chatReducer from "./chatReducer";
import profileReducer from "./profileReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  boy: boyReducer,
  chat: chatReducer,
  profile: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
