import gameModel from '../models/game.model';
import friendModel from '../models/friend.model';
import logger from '../core/logger/app-logger';
import modifyTable from '../utils/modifyTable';

let gameController = {};

gameController.createRequest = async (req, res) => {

	let friendship = await friendModel.getFriendship(req.body.userId, req.body.friendId)
		.then((answer) => {
			return answer.results[0];
		});

	const gameObj = {
		friendshipId : friendship.id,
		status: "PENDING"
	}

	let game = await modifyTable.insertRow('game',gameObj)

	let notificationObj = {
		userId: req.body.friendId,
		requesterId: req.body.userId,
		gameId: game.results.insertId,
		status: "PENDING"
	}

	let notification =  await modifyTable.insertRow('notification', notificationObj);

	let ret = {
		gameId: game.results.insertId,
		notificationId: notification.results.insertId
	}

	res.json(ret);

}


export default gameController;
