import '../users.css';

import React, { Component } from 'react';
import NotiBoard from './noti/NotiBoard';
import FriendBoard from './friends/FriendBoard';
import ProfileBoard from './profile/ProfileBoard';
import MessageBoard from './message/MessageBoard';

const DashboardRight = () => {
  if((window.location.pathname) === '/users/profile') {
    return <ProfileBoard />
  } else if((window.location.pathname) === '/users/friends') {
    return <FriendBoard />
  } else if((window.location.pathname) === '/users/noties') {
    return <NotiBoard />
  } else if((window.location.pathname) === '/users/messages') {
    return <MessageBoard />
  }

  return(
    <div>contents</div>
  )
}

export default DashboardRight;