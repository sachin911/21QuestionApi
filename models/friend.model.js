import {db} from '../db/connect';
import mysql from 'mysql';

const friendModel = {};

friendModel.getFriendList = (id) => {
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

friendModel.getFriendship = (userId, friendId) => {
	return new Promise((resolve, reject) => {
    db.query("select * from friend where ((friendA=" + userId +" and friendB=" + friendId +") or (friendA=" + friendId +" and friendB=" + userId +")) and status='ACTIVE'"
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

export default friendModel;
