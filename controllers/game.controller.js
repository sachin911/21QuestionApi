import gameModel from '../models/game.model';
import friendModel from '../models/friend.model';
import userModel from '../models/user.model';
import logger from '../core/logger/app-logger';
import modifyTable from '../utils/modifyTable';
import randomizer from '../utils/randomizer';
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

	const players = randomizer.randomizePlayers(req.body.userId, req.body.friendId);

	let gameObj = {
		friendshipId : friendship.id,
		status: "PENDING",
		...players
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

	gameObj = await gameModel.getGame(game.results.insertId);
	notificationObj.id = notification.results.insertId;

	//return the game id and the notification id back to request

	const questionPersonInfo = await userModel.getUserwithId(players.questionPerson);
	const answerPersonInfo = await userModel.getUserwithId(players.answerPerson);

	let ret = {
		game: gameObj,
		notification: notificationObj,
		questionPersonInfo: questionPersonInfo,
		answerPersonInfo: answerPersonInfo
	}

	res.json(ret);

}


gameController.joinGame = async (req, res) => {
	const gameObj = await gameModel.getGame(req.query.gameId)
		.then((answer) => {
			return answer;
		});

	logger.info("Got the game data>>>", gameObj);

	//return the game id and the notification id back to request

	const questionPersonInfo = await userModel.getUserwithId(gameObj.questionPerson);
	const answerPersonInfo = await userModel.getUserwithId(gameObj.answerPerson);

	let ret = {
		game: gameObj,
		notification: {},
		questionPersonInfo: questionPersonInfo,
		answerPersonInfo: answerPersonInfo
	}

	res.json(ret);
}

export default gameController;
