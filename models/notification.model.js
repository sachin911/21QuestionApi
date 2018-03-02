import {db} from '../db/connect';
import mysql from 'mysql';

const notificationModel = {};

notificationModel.createNotification = (id) => {
	return new Promise((resolve, reject) => {
    db.query("select distinct user.id, user.name, user.email, user.loggedInStatus, friend.`status` as friendStatus from user, friend where (user.id = friend.friendA or user.id = friend.friendB) and (friend.friendA = "+id+" OR friend.friendB = "+id+") and friend.status = 'ACTIVE'"
		, (error, results, fields) => {
      if (error) {
        reject(error); // similar to "throw"
      }
      else {
        resolve({ results }); // similar to "return"
      }
    });
  });
}

export default notificationModel;
