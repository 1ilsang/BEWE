"use strict";

import axios from 'axios';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const MESSAGE_MAKE_UPDATE = 'MESSAGE_MAKE_UPDATE';
export const MESSAGE_MAKE_NOT_UPDATE = 'MESSAGE_MAKE_NOT_UPDATE';

const ROOT_URL = 'http://localhost:4000/api/messages';
const token = JSON.parse(localStorage.getItem('token')); 
const userIdx = JSON.parse(localStorage.getItem('profile')).idx;
    
export function getConversations(){
  const request = axios.get(`${ROOT_URL}`, {headers: {'token' : token}});

  return {
    type: GET_CONVERSATIONS,
    payload: request
  }
}

export function getMessages(conversationIdx){
  const request = axios.get(`${ROOT_URL}/${conversationIdx}`, {headers: {'token' : token}});
  
  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function sendMessage(values, conversationIdx){
  return (dispatch, getState) => {
    const state = getState();

    // axios.post(`${ROOT_URL}/${conversationIdx}`, values, {headers: {'token' : token}})
    
    console.log('[MessageActions] sendMessage1');
    state.app.socket.emit('send-message', conversationIdx, userIdx, values.contents);
    console.log('[MessageActions] sendMessage2');
    dispatch({
      type: SEND_MESSAGE
    });
  }
}

export function makeUpdate(){
  return {
    type: MESSAGE_MAKE_UPDATE
  }
}

export function makeNotUpdate(){
  return {
    type: MESSAGE_MAKE_NOT_UPDATE
  }
}