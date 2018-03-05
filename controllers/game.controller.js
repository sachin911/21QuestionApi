import gameModel from '../models/game.model';
import friendModel from '../models/friend.model';
import logger from '../core/logger/app-logger';
import modifyTable from '../utils/modifyTable';

let gameController = {};

/**
createRequest function - this services takes the game request and
create an row for the game and also creates the notification for the game
**/

gameController.createRequest = async (req, res) => {

	let friendship = await friendModel.getFriendship(req.body.userId, req.body.friendId)
		.then((answer) => {
			return answer.results[0];
		});

	const gameObj = {
		friendshipId : friendship.id,
		status: "PENDING"
	}

	// the game is being created
	let game = await modifyTable.insertRow('game',gameObj)

	// make teh notification object to be inserted
	let notificationObj = {
		userId: req.body.friendId,
		requesterId: req.body.userId,
		gameId: game.results.insertId,
		status: "PENDING"
	}

	//inserting the notification row
	let notification =  await modifyTable.insertRow('notification', notificationObj);

	//return the game id and the notification id back to request
	let ret = {
		gameId: game.results.insertId,
		notificationId: notification.results.insertId
	}

	res.json(ret);

}


export default gameController;
