import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "./common/typography";
import Box from "./common/box";
import {
  sendMessage,
  getMessages,
  watchTaskRemovedEvent,
  watchTaskAddedEvent,
} from "../../../store/actions/chatActions";
import { connect } from "react-redux";
import { MdSend, MdClear, MdCancel, MdDone } from "react-icons/md";
import Avatar from "./common/avatar";
import Input from "./common/input";
import Tooltip from "./common/tooltip";
import Message from "./components/message";
import {
  Container,
  WhiteBox,
  SendButton,
  MessagesContainer,
  Scroll,
  CloseButton,
  ActionButton,
  Form,
} from "./elements";

// function updateScroll() {
//   var element = document.getElementById("scrollbottom");
//   element.scrollTop = element.scrollHeight;
// }

class ChatContent extends Component {
  state = {
    message: "",
    messages: [],
  };

  componentDidMount = async () => {
    const { chat } = this.props;
    await this.props.getMessages(chat);
  };

  componentDidUpdate = async () => {
    const { chat } = this.props;
    await this.props.getMessages(chat);
  };

  setRef = (ref) => {
    const { messages } = this.props;
    if (ref) {
      console.log(messages);
      // eslint-disable-next-line no-param-reassign
      ref.scrollTop = ref.scrollHeight;
    }
  };

  handleMessageChange = ({ target: { value } }) =>
    this.setState({ message: value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { chat } = this.props;
    this.props.sendMessage(this.state, chat);
    this.setState({ message: "" });
  };

  render() {
    const { user, closeChat, messages, profile, chat } = this.props;
    const { message } = this.state;
    let action;
    if (chat.status === "Interviewing") {
      action = (
        <Box display="flex" alignItems="center">
          <ActionButton
            size="small"
            color="primary"
            variant="soft"
            mr={5}
            onClick={this.handleHire}
          >
            Hire <MdDone />
          </ActionButton>
          <ActionButton
            size="small"
            color="danger"
            variant="soft"
            mr={5}
            onClick={this.handleReject}
          >
            Reject <MdCancel />
          </ActionButton>
        </Box>
      );
    }
    if (user !== null) {
      return (
        <Container>
          <WhiteBox height={70}>
            <Box p={10} display="flex" alignItems="center">
              <Avatar
                mr={20}
                size={50}
                src={user.imgFileURL || "/static/img/general/avatar.png"}
              />
              <div
                style={{
                  marginRight: 20,
                }}
              />
              <Typography mr="auto" variant="leadText">
                {user.firstName} {user.lastName}
              </Typography>
              {action}
              <Tooltip tag="Close chat">
                <CloseButton onClick={closeChat} variant="link" color="danger">
                  <MdClear />
                </CloseButton>
              </Tooltip>
            </Box>
          </WhiteBox>
          <Scroll ref={this.setRef}>
            <MessagesContainer>
              {messages &&
                // eslint-disable-next-line no-shadow
                messages.map(({ id, message, timestamp, sender }) => (
                  <Message
                    otherProfileImg={user.imgFileURL}
                    key={id}
                    message={message}
                    sentAt={timestamp}
                    seenAt={message}
                    isYours={profile.userID === sender}
                    yourPic={profile.imgFileURL}
                  />
                ))}
            </MessagesContainer>
          </Scroll>
          <WhiteBox height={60} bottom="0">
            <Form onSubmit={this.handleSubmit}>
              <Input
                value={message}
                onChange={this.handleMessageChange}
                mt={0}
              />
              <SendButton ml={5} variant="soft" color="primary">
                Send
                <MdSend />
              </SendButton>
            </Form>
          </WhiteBox>
        </Container>
      );
    }
    return null;
  }
}

ChatContent.defaultProps = {
  messages: undefined,
  user: undefined,
  profile: undefined,
};

ChatContent.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    jobOfferID: PropTypes.string,
    studentID: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  profile: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  closeChat: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    messages: state.chat,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (convID) => dispatch(getMessages(convID)),
    sendMessage: (activity, convID) => dispatch(sendMessage(activity, convID)),
    watchTaskAddedEvent: (convID) => dispatch(watchTaskAddedEvent(convID)),
    watchTaskRemovedEvent: (convID) => dispatch(watchTaskRemovedEvent(convID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);