import {db} from '../db/connect';
import mysql from 'mysql';

const notificationModel = {};

/**
fetchNotifications returns the following
	id - int
	userId - int
	requesterId -  int
	gameId - int
	friendshipId - int
	requesterName - string (name of the person who created the notification)
	requesterEmail- string (email of the person who crearted the notification)
**/
notificationModel.fetchNotifications = (userId) => {
	return new Promise((resolve, reject) => {
    db.query("select n.id, n.userId, n.requesterId, n.gameId, n.friendshipId, u.name as requesterName, u.email as requesterEmail, n.createdAt as createdAt from notification as n, user as u where n.userId ="+ userId +" and n.requesterId = u.id and n.STATUS='PENDING' order by createdAt"
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
