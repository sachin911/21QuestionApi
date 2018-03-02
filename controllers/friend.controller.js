import friendModel from '../models/friend.model';
import logger from '../core/logger/app-logger';

let friendController = {};

friendController.getFriendList = (req, res) => {
	friendModel.getFriendList(req.body.userId)
	.then((answer) => {
		logger.info("Got the Friend list for id>>", req.body.userId, answer);
		res.json(answer);
	})
	.catch((error) => {
		logger.error('Error in getting the friendList', error);
		res.json(error);
	});
}

export default friendController;
