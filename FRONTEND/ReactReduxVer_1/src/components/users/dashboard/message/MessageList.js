import React, { Component } from 'react';
import { default as Fade } from 'react-fade';
import { connect } from 'react-redux';

import { getMessages } from '../../../../actions/users/MessageActions';
import Message from './Message';
import MessageForm from './MessageForm';

// const fadeDuration = 0.5;

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      // fadeOut: false,
      userIdx: JSON.parse(localStorage.getItem('profile')).idx,
      formRender: false
    };

    this.renderMessages = this.renderMessages.bind(this);
    this.hasToUpdate = this.hasToUpdate.bind(this);
  }

  componentWillMount(){
    this.props.getMessages(this.props.conversationIdx);
  }

  componentWillUpdate(nextProps, nextState){
    if (this.props.newMessage !== nextProps.newMessage || 
      this.props.conversationIdx !== nextProps.conversationIdx) {
      
      this.props.getMessages(nextProps.conversationIdx);  
      
      this.setState({
        formRender: true
      });

      // setTimeout(() => {
      //   this.setState({
      //     fadeOut: false
      //   })
      // }, fadeDuration);

      // this.setState({
      //   fadeOut: true
      // });
    }    
  }

  componentDidUpdate(){
    this.scrollToBottom();  

    if (this.state.formRender) {
      this.setState({
        formRender: false
      });
    }
  }

  hasToUpdate(){
    this.props.getMessages(this.props.conversationIdx);  
  }

  scrollToBottom(){
    var objDiv = document.getElementsByClassName("message-list-chat-wrapper")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  renderMessages(){
    return this.props.messages
      // .slice(0, 15 * this.state.page - 1)
      .map((message) => {
        if(this.state.userIdx === message.sender_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"me"} />
          )
        } else if(this.state.userIdx === message.receiver_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"you"} />
          )
        }        
      });
  }

  render() {
    if(this.props.messages === undefined) {
      return <div>Loading...</div>
    }

    else {
      return(
        <div className="message-list-right-wrapper">
          <div className="message-list-top">
            <span>To: 
              <span className="name">{this.props.conversationNickname}</span>
            </span>
          </div>
          <div className="message-list-chat-wrapper">
            {/* <Fade
              out={this.state.fadeOut}
              duration={fadeDuration}> */}
              {this.renderMessages()}
            {/* </Fade> */}
          </div>
          <MessageForm 
            reRender={this.state.formRender}
            conversationIdx={this.props.conversationIdx} 
            hasToUpdate={this.hasToUpdate}/>
        </div>
      )
      // if(this.props.friends.length > this.state.page * 15) {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //       <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
      //     </div>
      //   )
      // } else {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //     </div>
      //   )
      // }
    }    
  }
}

function mapStateToProps(state){
  return { messages: state.messages.messages, newMessage: state.app.newMessage }
}

export default connect(mapStateToProps, { getMessages })(MessageList);