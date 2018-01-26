'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

exports.list = (userIdx) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notifications WHERE users_idx = ?";
    
    pool.query(sql, [userIdx], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });  
};

exports.create = (notificationData) => {
  return new Promise((resolve, reject) => {
    let contents, url = '';
    const userIdx = notificationData.usersIdx;

    switch (notificationData.type) {
      case 'friend_accepted':
        contents = `${notificationData.info.nickname}님이 친구 요청을 수락하셨습니다.`;
        url = `/users/friends/${userIdx}`;
        break;
      case 'friend_receive':
        contents = `${notificationData.info.nickname}님에게 친구 요청이 왔습니다.`;
        url = `/users/friends/${userIdx}`;
        break;
      case 'achievement':
        break;
    }

    const sql = 
      "INSERT INTO notifications (users_idx, contents, url) VALUES (?, ?, ?)";

    pool.query(sql, [notificationData.usersIdx, contents, url], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.affectedRows === 1) {
          resolve(rows);
        } else {
          const _err = new Error("notification 생성 중 에러 발생");
          reject(_err);
        }
      }
    });
  });
}

exports.check = (notiIdx, userData) => {
  return new Promise((resolve, reject) => {
    const sql = 
      "SELECT users_idx FROM notifications WHERE idx = ?";
    
    pool.query(sql, [notiIdx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.length === 0 || rows[0].users_idx != userData) {
          reject(2421);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE notifications SET flag = 1 WHERE idx = ?";

      pool.query(sql, [notiIdx], (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("notification 업데이트 중 에러 발생");
            reject(_err);
          }
        }
      });
    });
  });
}