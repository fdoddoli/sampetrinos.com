const chatReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return action.messages;
    case "MESSAGE_ADDED_LISTENER":
      return [...state, action.added];
    case "MESSAGE_REMOVED_LISTENER":
      return state.filter((task) => task.id !== action.removed.id);
    default:
      return state;
  }
};
export default chatReducer;
